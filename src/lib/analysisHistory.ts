/**
 * NavDrishti - Vehicle Analysis History & User Settings Persistence
 * Manages cloud storage in Supabase PostgreSQL and Supabase Storage with local caching.
 */

import { supabase } from './supabaseClient';
import { CarDiagnosticData } from '@/data/carAnalysis';

export interface AnalysisHistoryItem {
  id: string;
  user_id?: string | null;
  created_at: string;
  title: string;
  health_index: number;
  battery_soc: number;
  battery_temp: number;
  brake_pressure: number;
  friction_mu: number;
  can_state: string;
  dtc_faults: number;
  diagnostics_payload: CarDiagnosticData;
  pdf_url?: string | null;
  report_html?: string | null;
  telemetry_stats?: any;
  feed_stats?: any;
}

export interface UserPersistedSettings {
  kAtt: number;
  kRep: number;
  speedWarp?: number;
}

const LOCAL_STORAGE_KEY = 'navdrishti_analysis_history';
const SETTINGS_STORAGE_KEY = 'navdrishti_user_settings';

/**
 * Persists a new vehicle analysis snapshot and optional PDF into Supabase and local storage.
 */
export async function saveAnalysisSnapshot(
  data: {
    title: string;
    diagnostics: CarDiagnosticData;
    pdfBlob?: Blob;
    reportHtml?: string;
    telemetryStats?: any;
    feedStats?: any;
  },
  userId?: string | null
): Promise<AnalysisHistoryItem> {
  const localId = 'snap-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
  const nowISO = new Date().toISOString();

  let uploadedPdfUrl: string | null = null;

  // 1. If PDF blob provided and user is authenticated, upload to Supabase Storage
  if (data.pdfBlob && userId) {
    try {
      const storageFilePath = `${userId}/${localId}.pdf`;
      const { error: uploadError } = await supabase.storage
        .from('analysis_reports')
        .upload(storageFilePath, data.pdfBlob, {
          contentType: 'application/pdf',
          upsert: true,
        });

      if (!uploadError) {
        const { data: publicData } = supabase.storage
          .from('analysis_reports')
          .getPublicUrl(storageFilePath);
        uploadedPdfUrl = publicData.publicUrl;
      } else {
        console.warn('Supabase storage upload error:', uploadError);
      }
    } catch (storageErr) {
      console.error('Error uploading PDF to Supabase storage:', storageErr);
    }
  }

  const newItem: AnalysisHistoryItem = {
    id: localId,
    user_id: userId || null,
    created_at: nowISO,
    title: data.title,
    health_index: data.diagnostics.diagnostics.overallHealthIndex,
    battery_soc: data.diagnostics.battery.socPercent,
    battery_temp: data.diagnostics.battery.avgTempCelsius,
    brake_pressure: data.diagnostics.brakesAndSafety.primaryPressureBar,
    friction_mu: data.diagnostics.chassisAndTraction.frictionCoefficientMu,
    can_state: data.diagnostics.vehicle.operatingMode.includes('RUNNING') ? 'NOMINAL' : 'STANDBY',
    dtc_faults: data.diagnostics.diagnostics.dtcActiveCount,
    diagnostics_payload: data.diagnostics,
    pdf_url: uploadedPdfUrl,
    report_html: data.reportHtml || null,
    telemetry_stats: data.telemetryStats || {
      speedKmh: 42.4,
      steerDeg: 2.1,
      latAccel: 0.34,
      pressureBar: data.diagnostics.brakesAndSafety.primaryPressureBar,
      socPercent: data.diagnostics.battery.socPercent,
      frictionMu: data.diagnostics.chassisAndTraction.frictionCoefficientMu,
    },
    feed_stats: data.feedStats || {
      lidarPointsSec: data.diagnostics.sensorsCalibration.lidarPointsSec,
      cameraMtf: data.diagnostics.sensorsCalibration.cameraMtfSharpness,
      radarSnr: data.diagnostics.sensorsCalibration.radarSnrDb,
      gnssPrecisionCm: data.diagnostics.sensorsCalibration.gnssPrecisionCm,
      satellites: data.diagnostics.sensorsCalibration.gnssSatellites,
    },
  };

  // 2. Save to local storage for instant access & offline capability
  try {
    const existingStr = localStorage.getItem(LOCAL_STORAGE_KEY);
    const existing: AnalysisHistoryItem[] = existingStr ? JSON.parse(existingStr) : [];
    const updated = [newItem, ...existing].slice(0, 50); // Keep latest 50
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('LocalStorage save error:', err);
  }

  // 3. If authenticated, insert complete record into Supabase vehicle_analysis_history table
  if (userId) {
    try {
      const { data: inserted, error } = await supabase
        .from('vehicle_analysis_history')
        .insert({
          user_id: userId,
          title: newItem.title,
          health_index: newItem.health_index,
          battery_soc: newItem.battery_soc,
          battery_temp: newItem.battery_temp,
          brake_pressure: newItem.brake_pressure,
          friction_mu: newItem.friction_mu,
          can_state: newItem.can_state,
          dtc_faults: newItem.dtc_faults,
          diagnostics_payload: newItem.diagnostics_payload,
          pdf_url: newItem.pdf_url,
          report_html: newItem.report_html,
          telemetry_stats: newItem.telemetry_stats,
          feed_stats: newItem.feed_stats,
        })
        .select()
        .single();

      if (!error && inserted) {
        newItem.id = inserted.id;
        newItem.created_at = inserted.created_at;
      } else if (error) {
        console.error('Supabase analysis insert error:', error);
      }
    } catch (dbErr) {
      console.error('Database connection error while saving snapshot:', dbErr);
    }
  }

  return newItem;
}

/**
 * Fetches all previous analysis snapshots (merging Supabase cloud history with local cache).
 */
export async function fetchAnalysisHistory(userId?: string | null): Promise<AnalysisHistoryItem[]> {
  let localItems: AnalysisHistoryItem[] = [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY) || localStorage.getItem('raasta_analysis_history');
    if (raw) localItems = JSON.parse(raw);
  } catch (err) {
    console.warn('LocalStorage read error:', err);
  }

  if (!userId) {
    return localItems;
  }

  try {
    const { data: cloudItems, error } = await supabase
      .from('vehicle_analysis_history')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && cloudItems && cloudItems.length > 0) {
      const cloudIds = new Set(cloudItems.map((c) => c.id));
      const filteredLocal = localItems.filter((l) => !cloudIds.has(l.id));
      return [...cloudItems, ...filteredLocal];
    }
  } catch (err) {
    console.error('Error fetching Supabase analysis history:', err);
  }

  return localItems;
}

/**
 * Deletes a snapshot from history and removes associated PDF from Supabase Storage if present.
 */
export async function deleteAnalysisSnapshot(
  id: string,
  userId?: string | null,
  pdfUrl?: string | null
): Promise<boolean> {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const items: AnalysisHistoryItem[] = JSON.parse(raw);
      const filtered = items.filter((i) => i.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
    }
  } catch (e) {
    console.warn('LocalStorage delete error:', e);
  }

  if (userId) {
    try {
      await supabase.from('vehicle_analysis_history').delete().eq('id', id);

      if (pdfUrl) {
        const storageFilePath = `${userId}/${id}.pdf`;
        await supabase.storage.from('analysis_reports').remove([storageFilePath]);
      }
    } catch (err) {
      console.error('Supabase delete error:', err);
      return false;
    }
  }

  return true;
}

/**
 * Persists user APF and cockpit settings to Supabase and localStorage.
 */
export async function saveUserSettings(
  settings: UserPersistedSettings,
  userId?: string | null
): Promise<void> {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.warn('Error saving settings locally:', e);
  }

  if (userId) {
    try {
      await supabase.from('user_settings').upsert({
        user_id: userId,
        k_att: settings.kAtt,
        k_rep: settings.kRep,
        speed_warp: settings.speedWarp ?? 1.0,
        updated_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Error saving user settings to Supabase:', err);
    }
  }
}

/**
 * Loads previously saved user settings.
 */
export async function fetchUserSettings(
  userId?: string | null
): Promise<UserPersistedSettings | null> {
  if (userId) {
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (!error && data) {
        return {
          kAtt: Number(data.k_att),
          kRep: Number(data.k_rep),
          speedWarp: Number(data.speed_warp),
        };
      }
    } catch (err) {
      console.error('Error loading settings from Supabase:', err);
    }
  }

  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY) || localStorage.getItem('raasta_user_settings');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading settings from localStorage:', e);
  }

  return null;
}
