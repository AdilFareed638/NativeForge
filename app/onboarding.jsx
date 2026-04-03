import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { setItem } from '../lib/storage';
import { useTheme } from '../hooks/useTheme';
import { typography, spacing, borderRadius } from '../lib/theme';
import { Button } from '../components/ui/Button';
import { MaterialSymbolsOutlined } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Chip } from '../components/ui/Chip';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Your app idea, built in seconds',
    description: 'Transform your thoughts into a fully functional React Native application using generative AI.',
    icon: 'electric_bolt'
  },
  {
    id: '2',
    title: 'From sketch to app',
    description: 'Upload a wireframe or describe your vision. NativeForge handles the complex code architecture.',
    icon: 'draw'
  },
  {
    id: '3',
    title: 'One prompt.\nBoth platforms.',
    description: 'Instantly generate production-ready code that runs natively on iOS and Android.',
    icon: 'devices'
  }
];

export default function OnboardingScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      scrollRef.current?.scrollTo({ x: (currentIndex + 1) * SCREEN_WIDTH, animated: true });
    } else {
      finishOnboarding();
    }
  };

  const finishOnboarding = async () => {
    await setItem('onboarding_completed', true);
    router.replace('/auth');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <Button variant="ghost" title="Skip" onPress={finishOnboarding} />
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {slides.map((slide, index) => (
          <View key={slide.id} style={styles.slide}>
            <View style={[styles.iconContainer, { backgroundColor: colors['surface-container-high'] }]}>
              <MaterialSymbolsOutlined name={slide.icon} size={64} color={colors.primary} />
            </View>
            <Text style={[typography.displayLarge, styles.title, { color: colors['on-surface'] }]}>
              {slide.title}
            </Text>
            <Text style={[typography.bodyLarge, styles.description, { color: colors['on-surface-variant'] }]}>
              {slide.description}
            </Text>
            {index === 1 && <Chip label="System Ready" isAIPulse style={{ marginTop: spacing.xl, alignSelf: 'center' }} />}
            {index === 0 && (
              <View style={[styles.codeCard, { backgroundColor: colors['surface-container-lowest'] }]}>
                 <Text style={[typography.monoBody, { color: colors.tertiary }]}>{'<NativeForge />'}</Text>
              </View>
             )}
          </View>
        ))}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.xl }]}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { backgroundColor: index === currentIndex ? colors.primary : colors['surface-container-highest'] },
                index === currentIndex && { width: 24 }
              ]}
            />
          ))}
        </View>
        <Button 
          variant="primary" 
          title={currentIndex === slides.length - 1 ? "Get Started" : "Next"} 
          onPress={handleNext} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.md,
    alignItems: 'flex-end',
    zIndex: 10,
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width: SCREEN_WIDTH,
    paddingHorizontal: spacing.xxxl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  description: {
    textAlign: 'center',
    paddingHorizontal: spacing.md,
  },
  codeCard: {
    marginTop: spacing.xxl,
    padding: spacing.xl,
    borderRadius: borderRadius.large,
    width: '100%',
    alignItems: 'center'
  },
  footer: {
    paddingHorizontal: spacing.xxxl,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xxxl,
    gap: spacing.sm,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
  }
});
