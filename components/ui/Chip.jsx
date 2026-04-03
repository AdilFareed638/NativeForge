import React, { useEffect } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
  Easing
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { MaterialSymbolsOutlined } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { typography, spacing, borderRadius } from '../../lib/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Chip({ 
  label, 
  selected = false, 
  onPress,
  isAIPulse = false,
  icon,
  style 
}) {
  const { colors, isDark } = useTheme();
  
  const scale = useSharedValue(1);
  const pulseOpacity = useSharedValue(1);

  useEffect(() => {
    if (isAIPulse) {
      pulseOpacity.value = withRepeat(
        withTiming(0.6, { duration: 750, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
    } else {
      pulseOpacity.value = 1;
    }
  }, [isAIPulse]);

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    if (onPress) {
      Haptics.selectionAsync();
      onPress();
    }
  };

  const animatedScaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  const animatedPulseStyle = useAnimatedStyle(() => ({
    opacity: pulseOpacity.value
  }));

  if (isAIPulse) {
    return (
      <Animated.View style={[styles.aiPulseContainer, { backgroundColor: colors['tertiary-container'], borderRadius: borderRadius.full }, animatedPulseStyle, style]}>
        <Animated.View style={[styles.pulseDot, { backgroundColor: colors.tertiary }]} />
        <Text style={[typography.labelMedium, { color: colors['on-tertiary-container'] }]}>
          {label}
        </Text>
      </Animated.View>
    );
  }

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.chip,
        { 
          backgroundColor: selected ? colors['surface-container-highest'] : 'transparent',
          borderRadius: borderRadius.small
        },
        !selected && isDark && { borderWidth: 0.5, borderColor: `${colors['outline-variant']}26` }, // 15% opacity loosely
        !selected && !isDark && { borderWidth: 0.5, borderColor: `${colors['outline-variant']}26` },
        animatedScaleStyle,
        style
      ]}
    >
      {icon && (
        <MaterialSymbolsOutlined 
          name={icon} 
          size={16} 
          color={selected ? colors.primary : colors['on-surface-variant']} 
          style={{ marginRight: spacing.sm }} 
        />
      )}
      <Text style={[
        typography.labelMedium, 
        { color: selected ? colors.primary : colors['on-surface-variant'] }
      ]}>
        {label}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 32,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm
  },
  aiPulseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    alignSelf: 'flex-start'
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: spacing.sm,
  }
});
