import { useCallback } from 'react';
import useChatStore from '@/stores/chatStore';
import useUIStore from '@/stores/uiStore';
import type { Source } from '@/types';

export function useSources() {
  const { sources, setSources } = useChatStore();
  const { sourcePanelOpen, setSourcePanelOpen } = useUIStore();

  const showSources = useCallback(
    (newSources: Source[]) => {
      setSources(newSources);
      if (newSources.length > 0) {
        setSourcePanelOpen(true);
      }
    },
    [setSources, setSourcePanelOpen]
  );

  const clearSources = useCallback(() => {
    setSources([]);
  }, [setSources]);

  const toggleSourcePanel = useCallback(() => {
    setSourcePanelOpen(!sourcePanelOpen);
  }, [sourcePanelOpen, setSourcePanelOpen]);

  return {
    sources,
    sourcePanelOpen,
    showSources,
    clearSources,
    toggleSourcePanel,
    setSourcePanelOpen,
  };
}

export default useSources;
