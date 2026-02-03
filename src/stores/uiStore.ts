import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Theme } from '@/types';

interface UIState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;

  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  sourcePanelOpen: boolean;
  setSourcePanelOpen: (open: boolean) => void;

  uploadModalOpen: boolean;
  setUploadModalOpen: (open: boolean) => void;
}

const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'dark' ? 'light' : 'dark',
        })),
      setTheme: (theme) => set({ theme }),

      sidebarOpen: true,
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      sourcePanelOpen: false,
      setSourcePanelOpen: (open) => set({ sourcePanelOpen: open }),

      uploadModalOpen: false,
      setUploadModalOpen: (open) => set({ uploadModalOpen: open }),
    }),
    {
      name: 'techdocs-ui-storage',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);

export default useUIStore;
