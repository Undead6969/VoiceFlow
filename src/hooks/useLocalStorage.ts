import { useState, useEffect } from 'react';

interface TranscriptSegment {
  text: string;
  timestamp: number;
  id: string;
}

interface Summary {
  title: string;
  overview: string;
  keyPoints: string[];
  timeBasedInsights: Array<{
    timeRange: string;
    insight: string;
  }>;
  conclusion: string;
}

interface LocalTranscription {
  id: string;
  title: string;
  created_at: string;
  transcript: TranscriptSegment[];
  notes: string;
  summary: Summary | null;
}

export function useLocalStorage() {
  const [localTranscriptions, setLocalTranscriptions] = useState<LocalTranscription[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('guest_transcriptions');
    if (saved) {
      try {
        setLocalTranscriptions(JSON.parse(saved));
      } catch (error) {
        console.error('Error parsing local transcriptions:', error);
        localStorage.removeItem('guest_transcriptions');
      }
    }
  }, []);

  const saveTranscription = (transcription: Omit<LocalTranscription, 'id' | 'created_at'>) => {
    const newTranscription: LocalTranscription = {
      ...transcription,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    };

    const updated = [newTranscription, ...localTranscriptions];
    setLocalTranscriptions(updated);
    localStorage.setItem('guest_transcriptions', JSON.stringify(updated));
    return newTranscription.id;
  };

  const updateTranscription = (id: string, updates: Partial<LocalTranscription>) => {
    const updated = localTranscriptions.map(t => 
      t.id === id ? { ...t, ...updates } : t
    );
    setLocalTranscriptions(updated);
    localStorage.setItem('guest_transcriptions', JSON.stringify(updated));
  };

  const deleteTranscription = (id: string) => {
    const updated = localTranscriptions.filter(t => t.id !== id);
    setLocalTranscriptions(updated);
    localStorage.setItem('guest_transcriptions', JSON.stringify(updated));
  };

  return {
    localTranscriptions,
    saveTranscription,
    updateTranscription,
    deleteTranscription,
  };
}