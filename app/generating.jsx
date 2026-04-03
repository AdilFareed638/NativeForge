import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { typography, spacing, borderRadius } from '../lib/theme';
import { useGeneration } from '../hooks/useGeneration';
import { Chip } from '../components/ui/Chip';

export default function GeneratingScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { prompt } = useLocalSearchParams();
  const { isGenerating, progress, error, startGeneration } = useGeneration();

  useEffect(() => {
    let mounted = true;
    
    const run = async () => {
      try {
        const result = await startGeneration(prompt);
        if (mounted) {
          // Pass the resulting pseudo-code/JSON block to preview
          router.replace({ pathname: '/preview', params: { code: result } });
        }
      } catch (err) {
        // Handled by hook error state
      }
    };
    
    run();
    
    return () => { mounted = false; };
  }, [prompt]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Chip label={isGenerating ? "Building System..." : "System Halted"} isAIPulse={isGenerating} />
        {error && <Text style={[typography.bodyMedium, { color: colors.error, marginTop: spacing.md }]}>{error}</Text>}
      </View>
      
      <ScrollView 
        contentContainerStyle={styles.terminalContent}
        style={[styles.terminal, { backgroundColor: colors['surface-container-lowest'] }]}
      >
        <Text style={[typography.monoBody, { color: colors.tertiary }]}>
          {`> init build_sequence\n> prompt received: "${prompt}"\n\n`}
          {progress}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  terminal: {
    flex: 1,
    margin: spacing.md,
    borderRadius: borderRadius.large,
  },
  terminalContent: {
    padding: spacing.lg,
  }
});
