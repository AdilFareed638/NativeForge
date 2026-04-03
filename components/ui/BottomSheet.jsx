import React, { useEffect } from 'react';
import { View, StyleSheet, Pressable, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useTheme } from '../../hooks/useTheme';
import { borderRadius, spacing, shadows } from '../../lib/theme';
import { MaterialSymbolsOutlined } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export function BottomSheet({ 
  isVisible, 
  onClose, 
  children, 
  height = SCREEN_HEIGHT * 0.8 
}) {
  const { colors, isDark } = useTheme();
  
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      translateY.value = withSpring(0, { damping: 20, stiffness: 200 });
      opacity.value = withTiming(0.4, { duration: 200 });
    } else {
      translateY.value = withTiming(SCREEN_HEIGHT, { duration: 200 });
      opacity.value = withTiming(0, { duration: 200 });
    }
  }, [isVisible]);

  const handleClose = () => {
    translateY.value = withTiming(SCREEN_HEIGHT, { duration: 200 }, () => {
      runOnJS(onClose)();
    });
    opacity.value = withTiming(0, { duration: 200 });
  };

  const gesture = Gesture.Pan()
    .onChange((event) => {
      if (event.translationY > 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd((event) => {
      if (event.translationY > 100 || event.velocityY > 500) {
        runOnJS(handleClose)();
      } else {
        translateY.value = withSpring(0, { damping: 20, stiffness: 200 });
      }
    });

  const animatedSheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const animatedBackdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (!isVisible) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <Animated.View style={[styles.backdrop, animatedBackdropStyle]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
      </Animated.View>

      <GestureDetector gesture={gesture}>
        <Animated.View 
          style={[
            styles.sheet, 
            { 
              height,
              backgroundColor: colors['surface-container'],
              borderTopLeftRadius: borderRadius.extraLarge,
              borderTopRightRadius: borderRadius.extraLarge
            },
            shadows.floating(isDark),
            animatedSheetStyle
          ]}
        >
          {/* Drag Handle */}
          <View style={styles.handleContainer}>
            <View style={[styles.handle, { backgroundColor: colors['surface-container-highest'] }]} />
            <Pressable onPress={handleClose} style={styles.closeButton}>
              <MaterialSymbolsOutlined name="close" size={24} color={colors['on-surface-variant']} />
            </Pressable>
          </View>
          
          <View style={{ flex: 1 }}>
            {children}
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    zIndex: 100,
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 101,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    position: 'relative'
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  closeButton: {
    position: 'absolute',
    right: spacing.lg,
    top: spacing.md,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
