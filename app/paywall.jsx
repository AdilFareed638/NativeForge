import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialSymbolsOutlined } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { typography, spacing, borderRadius } from '../lib/theme';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export default function PaywallScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [isAnnual, setIsAnnual] = useState(true);

  // Use Safepay instead of Stripe
  const safepayPublicKey = process.env.EXPO_PUBLIC_SAFEPAY_PUBLIC_KEY || '';

  const handleSubscribe = async () => {
    try {
       // Mock Safepay flow 
       // Typically you'd open a Safepay checkout URL in WebView or Linking
       console.log('Initiating Safepay payment with key:', safepayPublicKey);
       Alert.alert("Safepay", "Redirecting to Safepay Checkout...");
    } catch (err) {
       console.error(err);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top, backgroundColor: colors['surface-container-highest'] }]}>
        <View style={styles.headerTop}>
           <Pressable onPress={() => router.back()} style={styles.closeButton}>
             <MaterialSymbolsOutlined name="close" size={24} color={colors['on-surface']} />
           </Pressable>
        </View>
        <View style={styles.heroContent}>
           <Text style={[typography.displayLarge, { color: colors['on-surface'], textAlign: 'center' }]}>Build without limits</Text>
           <Text style={[typography.bodyLarge, { color: colors['on-surface-variant'], textAlign: 'center', marginTop: spacing.md }]}>Upgrade to Forge Pro for unlimited apps, priority generation, and premium templates.</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={[styles.toggleContainer, { backgroundColor: colors['surface-container'] }]}>
          <Pressable 
            style={[styles.toggleButton, !isAnnual && { backgroundColor: isDark ? colors['surface-container-highest'] : colors.surface }]}
            onPress={() => setIsAnnual(false)}
          >
            <Text style={[typography.labelLarge, { color: !isAnnual ? colors['on-surface'] : colors['on-surface-variant'] }]}>Monthly</Text>
          </Pressable>
          <Pressable 
            style={[styles.toggleButton, isAnnual && { backgroundColor: isDark ? colors['surface-container-highest'] : colors.surface }]}
            onPress={() => setIsAnnual(true)}
          >
            <Text style={[typography.labelLarge, { color: isAnnual ? colors['on-surface'] : colors['on-surface-variant'] }]}>Annual (-20%)</Text>
          </Pressable>
        </View>

        <Card variant="featured" style={[styles.planCard, { borderColor: colors.primary, borderWidth: 1 }]}>
           <View style={styles.planHeader}>
              <Text style={[typography.titleLarge, { color: colors.primary }]}>Pro Plan</Text>
              <Text style={[typography.headlineMedium, { color: colors['on-surface'] }]}>
                {isAnnual ? '$19' : '$24'}
                <Text style={typography.bodyMedium}> / month</Text>
              </Text>
           </View>
           <View style={styles.planFeatures}>
              <View style={styles.featureRow}>
                <MaterialSymbolsOutlined name="check_circle" size={20} color={colors.tertiary} />
                <Text style={[typography.bodyMedium, { color: colors['on-surface'], marginLeft: spacing.sm }]}>Unlimited AI Generations</Text>
              </View>
              <View style={styles.featureRow}>
                <MaterialSymbolsOutlined name="check_circle" size={20} color={colors.tertiary} />
                <Text style={[typography.bodyMedium, { color: colors['on-surface'], marginLeft: spacing.sm }]}>Export source code</Text>
              </View>
              <View style={styles.featureRow}>
                <MaterialSymbolsOutlined name="check_circle" size={20} color={colors.tertiary} />
                <Text style={[typography.bodyMedium, { color: colors['on-surface'], marginLeft: spacing.sm }]}>Premium templates</Text>
              </View>
           </View>
        </Card>

        <View style={styles.footer}>
           <Button variant="primary" title="Subscribe Now" onPress={handleSubscribe} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: spacing.xxl,
  },
  headerTop: {
    alignItems: 'flex-end',
    padding: spacing.md,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: {
    paddingHorizontal: spacing.xxl,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },
  toggleContainer: {
    flexDirection: 'row',
    height: 48,
    borderRadius: borderRadius.large,
    padding: spacing.xs,
    marginBottom: spacing.xxl,
  },
  toggleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.medium,
  },
  planCard: {
    padding: spacing.xl,
  },
  planHeader: {
    marginBottom: spacing.lg,
  },
  planFeatures: {
    gap: spacing.sm,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    marginTop: 'auto',
    marginBottom: spacing.xxxl,
  }
});
