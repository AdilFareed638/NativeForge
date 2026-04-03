import React, { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, Text } from 'react-native';
import { MaterialSymbolsOutlined } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { typography, spacing, borderRadius } from '../../lib/theme';

export function Input({ 
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  isPrompt = false,
  multiline = false,
  error,
  style 
}) {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!secureTextEntry);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const fontStyle = isPrompt ? typography.monoBody : typography.bodyLarge;

  return (
    <View style={style}>
      {label && <Text style={[typography.labelMedium, { color: colors.primary, marginBottom: spacing.sm, marginLeft: spacing.lg }]}>{label}</Text>}
      
      <View style={[
        styles.container,
        { backgroundColor: isPrompt ? colors['surface-container-lowest'] : colors['surface-container-low'] },
        isFocused && { borderBottomWidth: 2, borderBottomColor: colors.primary },
        error && { borderBottomWidth: 2, borderBottomColor: colors.error }
      ]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors['on-surface-variant']}
          secureTextEntry={secureTextEntry && !showPassword}
          multiline={multiline}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[
            styles.input,
            fontStyle,
            { color: colors['on-surface'] },
            multiline && { minHeight: isPrompt ? 120 : 64, maxHeight: isPrompt ? 280 : 160, textAlignVertical: 'top' }
          ]}
        />
        
        {secureTextEntry && (
          <Pressable onPress={togglePasswordVisibility} style={styles.iconButton}>
            <MaterialSymbolsOutlined 
              name={showPassword ? "visibility_off" : "visibility"} 
              size={20} 
              color={colors['on-surface-variant']} 
            />
          </Pressable>
        )}
      </View>
      {error && <Text style={[typography.bodySmall, { color: colors.error, marginTop: spacing.xs, marginLeft: spacing.lg }]}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.medium,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  iconButton: {
    padding: spacing.md,
  }
});
