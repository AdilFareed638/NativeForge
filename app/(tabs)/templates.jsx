import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialSymbolsOutlined } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { typography, spacing, borderRadius } from '../../lib/theme';
import { Chip } from '../../components/ui/Chip';
import { Card } from '../../components/ui/Card';

const CATEGORIES = ['All', 'E-commerce', 'Social', 'Productivity', 'Finance'];
const TEMPLATES = [
  { id: '1', title: 'E-commerce Startup', author: 'NativeForge', type: 'Shop' },
  { id: '2', title: 'Social Feed', author: 'Community', type: 'Feed' },
  { id: '3', title: 'Task Manager', author: 'NativeForge', type: 'List' },
  { id: '4', title: 'Crypto Wallet', author: 'Community', type: 'Finance' },
];

export default function TemplatesScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={[typography.headlineMedium, { color: colors['on-surface'] }]}>Templates</Text>
      </View>
      
      <View style={styles.filters}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {CATEGORIES.map((cat, index) => (
             <Chip key={cat} label={cat} selected={index === 0} />
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 100 }]}>
        <View style={styles.grid}>
          {TEMPLATES.map((item) => (
            <Card key={item.id} variant="primary" style={styles.templateCard}>
              <View style={[styles.imagePlaceholder, { backgroundColor: colors['surface-container-high'] }]}>
                 <MaterialSymbolsOutlined name="view_quilt" size={32} color={colors.primary} />
              </View>
              <Text style={[typography.titleMedium, { color: colors['on-surface'], marginTop: spacing.md }]}>{item.title}</Text>
              <Text style={[typography.bodySmall, { color: colors['on-surface-variant'], marginTop: spacing.xs }]}>by {item.author}</Text>
            </Card>
          ))}
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
    paddingVertical: spacing.md,
  },
  filters: {
    marginBottom: spacing.lg,
  },
  filterScroll: {
    paddingHorizontal: spacing.md,
  },
  content: {
    paddingHorizontal: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  templateCard: {
    width: '47%', // approximation for 2-column with gap
    padding: spacing.md,
  },
  imagePlaceholder: {
    width: '100%',
    height: 100,
    borderRadius: borderRadius.small,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
