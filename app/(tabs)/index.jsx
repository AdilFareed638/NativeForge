import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
import { typography, spacing, borderRadius } from '../../lib/theme';
import { AppBar } from '../../components/ui/AppBar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { MaterialSymbolsOutlined } from '@expo/vector-icons';
import { Image } from 'expo-image';

const MOCK_RECENT_APPS = [
  { id: '1', name: 'Fitness Tracker', type: 'Health', time: '2h ago' },
  { id: '2', name: 'Recipe Vault', type: 'Food', time: '5h ago' },
  { id: '3', name: 'Travel Planner', type: 'Travel', time: '1d ago' },
];

export default function HomeDashboard() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppBar 
        scrollY={scrollY}
        title="Good morning, Ali"
        subtitle="forge-v1.0.4-stable system ready"
        onMenuPress={() => console.log('Menu/Drawer')}
        onNotificationPress={() => console.log('Notifications')}
        onProfilePress={() => router.push('/profile')}
      />

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Recent Apps Horizontal Scroll */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[typography.titleLarge, { color: colors['on-surface'] }]}>Recent Apps</Text>
            <Button variant="ghost" title="View All" onPress={() => router.push('/apps')} style={styles.viewAllButton} />
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollContent}>
            {MOCK_RECENT_APPS.map((app, index) => (
              <Card key={app.id} variant="primary" style={[styles.recentAppCard, index === 0 && { marginLeft: spacing.md }]}>
                <View style={[styles.appIconPlaceholder, { backgroundColor: colors['surface-container-high'] }]}>
                   <MaterialSymbolsOutlined name="smartphone" size={32} color={colors.primary} />
                </View>
                <Text style={[typography.titleMedium, { color: colors['on-surface'], marginTop: spacing.md }]} numberOfLines={1}>
                  {app.name}
                </Text>
                <Text style={[typography.bodyMedium, { color: colors['on-surface-variant'] }]}>
                  {app.time}
                </Text>
              </Card>
            ))}
          </ScrollView>
        </View>

        {/* Start Building Bento Grid */}
        <View style={styles.section}>
          <Text style={[typography.titleLarge, { color: colors['on-surface'], marginLeft: spacing.md, marginBottom: spacing.lg }]}>
            Start Building
          </Text>
          
          <View style={styles.bentoGrid}>
            <Pressable style={styles.bentoRow} onPress={() => router.push({ pathname: '/builder', params: { tab: 'prompt' } })}>
              <Card variant="featured" style={[styles.bentoMainCard, { backgroundColor: colors['primary-container'] }]}>
                <MaterialSymbolsOutlined name="chat_bubble" size={32} color={colors['on-primary-container']} style={styles.bentoIcon} />
                <Text style={[typography.titleLarge, { color: colors['on-primary-container'] }]}>Describe it</Text>
                <Text style={[typography.bodyMedium, { color: colors['on-primary-container'] }]}>Generate UI from text prompts</Text>
              </Card>
            </Pressable>

            <View style={styles.bentoRow}>
              <Pressable style={styles.bentoHalfCell} onPress={() => router.push({ pathname: '/builder', params: { tab: 'sketch' } })}>
                <Card variant="primary" style={styles.bentoSubCard}>
                   <MaterialSymbolsOutlined name="draw" size={28} color={colors.primary} style={styles.bentoIcon} />
                   <Text style={[typography.titleMedium, { color: colors['on-surface'] }]}>Upload Sketch</Text>
                </Card>
              </Pressable>
              
              <Pressable style={styles.bentoHalfCell} onPress={() => router.push({ pathname: '/builder', params: { tab: 'template' } })}>
                <Card variant="primary" style={styles.bentoSubCard}>
                   <MaterialSymbolsOutlined name="grid_view" size={28} color={colors.tertiary} style={styles.bentoIcon} />
                   <Text style={[typography.titleMedium, { color: colors['on-surface'] }]}>Browse Templates</Text>
                </Card>
              </Pressable>
            </View>
          </View>
        </View>

      </Animated.ScrollView>

      {/* Persistent FAB */}
      <View style={[styles.fabContainer, { bottom: insets.bottom + 96 }]}>
        <Button 
          variant="fab" 
          icon="add" 
          title="New App" 
          onPress={() => router.push('/builder')} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: spacing.md,
  },
  section: {
    marginBottom: spacing.xxxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  viewAllButton: {
    height: 36,
    paddingHorizontal: spacing.sm,
  },
  horizontalScrollContent: {
    paddingRight: spacing.md,
    gap: spacing.md,
  },
  recentAppCard: {
    width: 160,
    padding: spacing.lg,
  },
  appIconPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bentoGrid: {
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  bentoRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  bentoMainCard: {
    flex: 1,
    padding: spacing.xl,
    minHeight: 140,
  },
  bentoHalfCell: {
    flex: 1,
  },
  bentoSubCard: {
    padding: spacing.lg,
    minHeight: 120,
    justifyContent: 'center',
  },
  bentoIcon: {
    marginBottom: spacing.md,
  },
  fabContainer: {
    position: 'absolute',
    right: spacing.lg,
    zIndex: 10,
  }
});
