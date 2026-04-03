import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  interpolateColor
} from 'react-native-reanimated';
import { MaterialSymbolsOutlined } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useTheme } from '../../hooks/useTheme';
import { typography, spacing } from '../../lib/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function AppBar({ 
  title, 
  subtitle,
  scrollY,
  onMenuPress,
  onNotificationPress,
  onProfilePress,
  avatarUrl
}) {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  
  const headerHeight = 152;
  const collapsedHeight = 64;

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    if (!scrollY) return { backgroundColor: 'transparent' };
    
    // Animate background color from transparent to surface-container-highest
    const backgroundColor = interpolateColor(
      scrollY.value,
      [0, headerHeight - collapsedHeight],
      ['rgba(0,0,0,0)', isDark ? colors['surface-container-highest'] : colors['surface-container-high']]
    );
    
    return { backgroundColor };
  });

  return (
    <Animated.View style={[styles.container, { paddingTop: insets.top }, animatedBackgroundStyle]}>
      <View style={styles.topRow}>
        <View style={styles.leftActions}>
          <Pressable onPress={onMenuPress} style={styles.iconButton}>
            <MaterialSymbolsOutlined name="menu" size={24} color={colors['on-surface']} />
          </Pressable>
          <Text style={[typography.titleLarge, { color: colors['on-surface'], marginLeft: spacing.sm }]}>
            NativeForge
          </Text>
        </View>
        <View style={styles.rightActions}>
          <Pressable onPress={onNotificationPress} style={styles.iconButton}>
            <MaterialSymbolsOutlined name="notifications_outlined" size={24} color={colors['on-surface']} />
          </Pressable>
          <Pressable onPress={onProfilePress} style={[styles.avatarContainer, { backgroundColor: colors['primary-container'], borderColor: colors.primary }]}>
            {avatarUrl ? (
              <Image source={{ uri: avatarUrl }} style={styles.avatar} contentFit="cover" />
            ) : (
              <Text style={[typography.titleMedium, { color: colors['on-primary-container'] }]}>A</Text>
            )}
          </Pressable>
        </View>
      </View>
      
      {title && (
        <View style={styles.expandedContent}>
          <Text style={[typography.headlineLarge, { color: colors['on-surface'] }]}>{title}</Text>
          {subtitle && (
             <Text style={[typography.bodyMedium, { color: colors['on-surface-variant'], marginTop: spacing.xs }]}>{subtitle}</Text>
          )}
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: spacing.md,
    zIndex: 50,
  },
  topRow: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    overflow: 'hidden',
    marginLeft: spacing.sm,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  expandedContent: {
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.lg,
    paddingTop: spacing.md,
  }
});
