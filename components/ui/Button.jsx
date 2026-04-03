import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  interpolateColor 
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialSymbolsOutlined } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { typography, spacing, borderRadius, shadows } from '../../lib/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Button({ 
  variant = 'primary', 
  title, 
  icon, 
  onPress, 
  style, 
  textStyle,
  disabled 
}) {
  const { colors, isDark } = useTheme();
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 15, stiffness: 200 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    if (!disabled && onPress) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress();
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const renderContent = () => {
    const textColor = 
      variant === 'primary' ? colors['on-primary'] :
      variant === 'secondary' ? colors['on-surface'] :
      variant === 'ghost' ? colors.primary :
      variant === 'fab' ? colors['on-surface'] : colors['on-surface'];

    return (
      <>
        {icon && (
          <MaterialSymbolsOutlined 
            name={icon} 
            size={24} 
            color={textColor} 
            style={{ marginRight: title ? spacing.sm : 0 }} 
          />
        )}
        {title && (
          <Text style={[typography.labelLarge, { color: textColor }, textStyle]}>
            {title}
          </Text>
        )}
      </>
    );
  };

  if (variant === 'primary') {
    return (
      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={[styles.base, styles.primaryContainer, animatedStyle, style]}
      >
        <LinearGradient
          colors={[colors.primary, colors['primary-fixed-dim']]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            StyleSheet.absoluteFillObject,
            { borderRadius: borderRadius.full },
            isDark && {
              borderWidth: 0.5,
              borderColor: `${colors['primary-fixed']}26` // 15% opacity loosely
            }
          ]}
        />
        {renderContent()}
      </AnimatedPressable>
    );
  }

  if (variant === 'secondary') {
    return (
      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={[
          styles.base, 
          { backgroundColor: colors['surface-container-high'], borderRadius: borderRadius.full }, 
          animatedStyle, 
          style
        ]}
      >
        {renderContent()}
      </AnimatedPressable>
    );
  }

  if (variant === 'ghost') {
    return (
      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={[styles.base, { backgroundColor: 'transparent' }, animatedStyle, style]}
      >
        {renderContent()}
      </AnimatedPressable>
    );
  }

  if (variant === 'fab') {
    return (
      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={[
          styles.fab, 
          animatedStyle, 
          shadows.floating(isDark),
          { borderRadius: borderRadius.large },
          style
        ]}
      >
        <BlurView 
          intensity={80} 
          tint={isDark ? 'dark' : 'light'} 
          style={[
            StyleSheet.absoluteFillObject,
            { borderRadius: borderRadius.large, overflow: 'hidden' }
          ]} 
        />
        <LinearGradient
           colors={[`${colors.primary}26`, `${colors.primary}00`]} // 15% to 0 Ghost Border loosely
           style={StyleSheet.absoluteFill}
           pointerEvents="none"
        />
        {renderContent()}
      </AnimatedPressable>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    paddingHorizontal: spacing.xxl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  primaryContainer: {
    borderRadius: borderRadius.full,
  },
  fab: {
    height: 56,
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
