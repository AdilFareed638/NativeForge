import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
import { typography, spacing } from '../../lib/theme';
import { Button } from '../../components/ui/Button';

export default function ProfileScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={[typography.headlineMedium, { color: colors['on-surface'] }]}>Profile</Text>
      </View>
      
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 100 }]}>
        <View style={styles.userInfo}>
          <View style={[styles.avatar, { backgroundColor: colors['primary-container'] }]}>
             <Text style={[typography.headlineMedium, { color: colors['on-primary-container'] }]}>A</Text>
          </View>
          <Text style={[typography.titleLarge, { color: colors['on-surface'], marginTop: spacing.md }]}>Ali Developer</Text>
          <Text style={[typography.bodyMedium, { color: colors['on-surface-variant'] }]}>ali@example.com</Text>
        </View>

        <View style={styles.section}>
          <Text style={[typography.titleMedium, { color: colors['on-surface'], marginBottom: spacing.md }]}>Settings</Text>
          <Button 
            variant="secondary" 
            title={`Dark Mode: ${isDark ? 'On' : 'Off'}`} 
            icon={isDark ? "dark_mode" : "light_mode"} 
            onPress={toggleTheme}
            style={styles.settingButton}
          />
          <Button 
            variant="secondary" 
            title="Subscription & Billing" 
            icon="credit_card" 
            onPress={() => router.push('/paywall')}
            style={styles.settingButton}
          />
        </View>

        <View style={styles.section}>
          <Button 
            variant="ghost" 
            title="Sign Out" 
            icon="logout"
            onPress={() => router.replace('/auth')}
            textStyle={{ color: colors.error }}
          />
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
    paddingVertical: spacing.xl,
  },
  content: {
    paddingHorizontal: spacing.md,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: spacing.xxxl,
  },
  settingButton: {
    marginBottom: spacing.md,
    justifyContent: 'flex-start',
  }
});
