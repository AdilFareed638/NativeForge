import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { borderRadius, shadows } from '../../lib/theme';

export function Card({ 
  variant = 'primary', 
  children, 
  style 
}) {
  const { colors, isDark } = useTheme();

  const getBackgroundColor = () => {
    switch(variant) {
      case 'primary': return colors['surface-container'];
      case 'featured': return colors['surface-container-high'];
      case 'recessed': return colors['surface-container-lowest'];
      default: return colors['surface-container'];
    }
  };

  const extraStyles = variant === 'featured' ? shadows.floating(isDark) : {};

  return (
    <View 
      style={[
        styles.base, 
        { 
          backgroundColor: getBackgroundColor(),
          borderRadius: borderRadius.large
        }, 
        extraStyles,
        style
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  }
});
