import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialSymbolsOutlined } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { typography, spacing, borderRadius } from '../../lib/theme';

export default function AppsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={[typography.headlineMedium, { color: colors['on-surface'] }]}>My Apps</Text>
      </View>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 100 }]}>
        <View style={styles.emptyState}>
          <View style={[styles.emptyIconContainer, { backgroundColor: colors['surface-container-high'] }]}>
             <MaterialSymbolsOutlined name="apps" size={48} color={colors['on-surface-variant']} />
          </View>
          <Text style={[typography.titleLarge, { color: colors['on-surface'], marginTop: spacing.xl }]}>No apps yet</Text>
          <Text style={[typography.bodyMedium, { color: colors['on-surface-variant'], textAlign: 'center', marginTop: spacing.sm }]}>
            Your created applications will appear here. Head to Forge to build your first app.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xl,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
