import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolateColor,
  Easing
} from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';
import { borderRadius } from '../../lib/theme';

export function SkeletonLoader({ style, width = '100%', height = 20, borderRadius: customBorderRadius = borderRadius.small }) {
  const { colors } = useTheme();
  const animationValue = useSharedValue(0);

  useEffect(() => {
    animationValue.value = withRepeat(
      withTiming(1, { duration: 1200, easing: Easing.linear }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animationValue.value,
      [0, 0.5, 1],
      [colors['surface-container-low'], colors['surface-container-high'], colors['surface-container-low']]
    );
    return { backgroundColor };
  });

  return (
    <Animated.View style={[
      styles.skeleton, 
      { width, height, borderRadius: customBorderRadius }, 
      animatedStyle,
      style
    ]} />
  );
}

const styles = StyleSheet.create({
  skeleton: {
    overflow: 'hidden',
  }
});
