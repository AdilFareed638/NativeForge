import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { MaterialSymbolsOutlined } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { typography, spacing, borderRadius } from '../lib/theme';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Chip } from '../components/ui/Chip';

export default function AuthScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = () => {
    // Navigate to index upon successful auth (simulated here)
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { marginTop: insets.top + spacing.xxxl }]}>
          <View style={[styles.logoContainer, { backgroundColor: colors['primary-container'] }]}>
            <MaterialSymbolsOutlined name="build" size={32} color={colors['on-primary-container']} />
          </View>
          <Text style={[typography.headlineMedium, { color: colors['on-surface'], marginTop: spacing.xl }]}>
            Welcome to NativeForge
          </Text>
          <Text style={[typography.bodyLarge, { color: colors['on-surface-variant'], marginTop: spacing.sm }]}>
            Sign in to start building
          </Text>
        </View>

        <Card style={styles.card}>
          <Button 
            variant="secondary" 
            title="Continue with Google"
            icon="account_circle"
            style={styles.socialButton}
          />
          <Button 
            variant="secondary" 
            title="Continue with GitHub"
            icon="code_blocks"
            style={styles.socialButton}
          />

          <View style={styles.dividerContainer}>
            <View style={[styles.divider, { backgroundColor: colors['surface-container-highest'] }]} />
            <Text style={[typography.bodySmall, { color: colors['on-surface-variant'], paddingHorizontal: spacing.md }]}>or</Text>
            <View style={[styles.divider, { backgroundColor: colors['surface-container-highest'] }]} />
          </View>

          <Input
            placeholder="developer@example.com"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          <Button 
            variant="primary" 
            title={isLogin ? "Sign In" : "Create Account"} 
            onPress={handleAuth}
            style={styles.actionButton}
          />

          <Button 
            variant="ghost" 
            title={isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"} 
            onPress={() => setIsLogin(!isLogin)}
            textStyle={{ color: colors.primary }}
          />
        </Card>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Chip label="System Ready" isAIPulse />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: spacing.xl,
  },
  socialButton: {
    marginBottom: spacing.md,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  input: {
    marginBottom: spacing.md,
  },
  actionButton: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  footer: {
    alignItems: 'center',
    paddingTop: spacing.md,
  }
});
