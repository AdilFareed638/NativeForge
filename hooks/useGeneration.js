import { useState, useCallback } from 'react';
import { generateApp } from '../lib/gemini';
import * as Haptics from 'expo-haptics';

export function useGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState(null);

  const startGeneration = useCallback(async (prompt) => {
    setIsGenerating(true);
    setProgress('');
    setError(null);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      // Simulate connection/initialization delay
      setProgress('Initializing NativeForge agent...\n');
      
      const output = await generateApp(prompt, (chunk) => {
        setProgress(prev => prev + chunk);
      });
      
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      return output;
    } catch (err) {
      setError(err.message || 'Generation failed');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return {
    isGenerating,
    progress,
    error,
    startGeneration
  };
}
