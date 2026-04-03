import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialSymbolsOutlined } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { typography, spacing, borderRadius } from '../lib/theme';
import { Button } from '../components/ui/Button';

export default function PreviewScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const { code } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('preview');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top, backgroundColor: colors['surface-container-highest'] }]}>
        <View style={styles.headerTop}>
          <Pressable onPress={() => router.back()} style={styles.iconButton}>
            <MaterialSymbolsOutlined name="close" size={24} color={colors['on-surface']} />
          </Pressable>
          <Text style={[typography.titleMedium, { color: colors['on-surface'] }]}>App Preview</Text>
          <Pressable style={styles.iconButton}>
            <MaterialSymbolsOutlined name="share" size={24} color={colors['on-surface']} />
          </Pressable>
        </View>

        <View style={styles.tabBar}>
          <Pressable 
            style={[styles.tab, activeTab === 'preview' && { borderBottomColor: colors.primary, borderBottomWidth: 2 }]} 
            onPress={() => setActiveTab('preview')}
          >
            <Text style={[typography.labelLarge, { color: activeTab === 'preview' ? colors.primary : colors['on-surface-variant'] }]}>Preview UI</Text>
          </Pressable>
          <Pressable 
            style={[styles.tab, activeTab === 'code' && { borderBottomColor: colors.primary, borderBottomWidth: 2 }]} 
            onPress={() => setActiveTab('code')}
          >
            <Text style={[typography.labelLarge, { color: activeTab === 'code' ? colors.primary : colors['on-surface-variant'] }]}>Source Code</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.content}>
        {activeTab === 'preview' ? (
          <View style={styles.centerContainer}>
            <MaterialSymbolsOutlined name="smartphone" size={64} color={colors['surface-container-highest']} />
            <Text style={[typography.titleLarge, { color: colors['on-surface-variant'], marginTop: spacing.md }]}>Interactive Preview</Text>
            <Text style={[typography.bodyMedium, { color: colors['on-surface-variant'], textAlign: 'center', marginTop: spacing.xs }]}>
              The functional layout would be mounted here dynamically using Expo snack or remote evaluation.
            </Text>
          </View>
        ) : (
          <ScrollView 
            style={[styles.codeContainer, { backgroundColor: colors['surface-container-lowest'] }]}
            contentContainerStyle={{ padding: spacing.md }}
          >
            <Text style={[typography.monoBody, { color: colors.tertiary }]}>{code || '// No generated code'}</Text>
          </ScrollView>
        )}
      </View>
      
      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button variant="primary" icon="download" title="Export Project" style={{ width: '100%' }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    height: 48,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  codeContainer: {
    flex: 1,
    margin: spacing.md,
    borderRadius: borderRadius.medium,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  }
});
