'use client';

/**
 * RAASTA.AI - usePanelState Hook
 * Controls panel expansion, collapse, and active drawer selection.
 */

import { useState, useCallback } from 'react';

export type DrawerType = 'metrics' | 'feeds' | 'controls' | 'scenarios' | null;

export function usePanelState() {
  const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMetricsPanelOpen, setIsMetricsPanelOpen] = useState(true);
  const [isFeedsPanelOpen, setIsFeedsPanelOpen] = useState(true);

  const toggleSidebar = useCallback(() => setIsSidebarOpen((prev) => !prev), []);
  const toggleMetrics = useCallback(() => setIsMetricsPanelOpen((prev) => !prev), []);
  const toggleFeeds = useCallback(() => setIsFeedsPanelOpen((prev) => !prev), []);

  const openDrawer = useCallback((drawer: DrawerType) => {
    setActiveDrawer(drawer);
  }, []);

  const closeDrawer = useCallback(() => {
    setActiveDrawer(null);
  }, []);

  return {
    activeDrawer,
    openDrawer,
    closeDrawer,
    isSidebarOpen,
    toggleSidebar,
    setIsSidebarOpen,
    isMetricsPanelOpen,
    toggleMetrics,
    isFeedsPanelOpen,
    toggleFeeds,
  };
}
