import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialSymbolsOutlined } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { typography, spacing, borderRadius } from '../lib/theme';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Chip } from '../components/ui/Chip';

export default function BuilderScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const initialMode = params.tab || 'prompt';
  
  const [activeTab, setActiveTab] = useState(initialMode);
  const [prompt, setPrompt] = useState('');

  const assistPrompts = [
    "A fitness tracker with daily goals",
    "A messaging app with dark mode",
    "An e-commerce dashboard"
  ];

  const handleGenerate = () => {
    if (prompt) {
      router.push({ pathname: '/generating', params: { prompt } });
    }
  };

  const renderPromptTab = () => (
    <View style={styles.tabContent}>
      <Input
        isPrompt
        multiline
        placeholder="Describe the app you want to build..."
        value={prompt}
        onChangeText={setPrompt}
        style={styles.promptInput}
      />
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.assistScroll}>
        {assistPrompts.map((text, idx) => (
          <Chip key={idx} label={text} onPress={() => setPrompt(text)} />
        ))}
      </ScrollView>

      <Button 
        variant="primary" 
        title="Generate my app" 
        icon="magic_button"
        onPress={handleGenerate}
        disabled={!prompt.trim()}
        style={styles.generateButton}
      />
    </View>
  );

  const renderSketchTab = () => (
    <View style={styles.tabContent}>
      <Pressable style={[styles.uploadZone, { borderColor: colors.outline, backgroundColor: colors['surface-container-lowest'] }]}>
        <MaterialSymbolsOutlined name="upload_file" size={48} color={colors['on-surface-variant']} />
        <Text style={[typography.titleMedium, { color: colors['on-surface'], marginTop: spacing.md }]}>Upload Wireframe</Text>
        <Text style={[typography.bodyMedium, { color: colors['on-surface-variant'], marginTop: spacing.xs }]}>PNG, JPG, or PDF up to 10MB</Text>
      </Pressable>
      
      <Input
        isPrompt
        placeholder="Add context to your sketch (optional)..."
        value={prompt}
        onChangeText={setPrompt}
        style={styles.promptInput}
      />
      
      <Button 
        variant="primary" 
        title="Analyze and Generate" 
        icon="auto_awesome"
        style={styles.generateButton}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerTop}>
           <Pressable onPress={() => router.back()} style={styles.backButton}>
             <MaterialSymbolsOutlined name="arrow_back" size={24} color={colors['on-surface']} />
           </Pressable>
           <Text style={[typography.titleLarge, { color: colors['on-surface'] }]}>App Builder</Text>
           <View style={{ width: 40 }} />
        </View>
        
        <View style={[styles.segmentedControl, { backgroundColor: colors['surface-container'] }]}>
          {['prompt', 'sketch', 'template'].map((tab) => {
             const isActive = activeTab === tab;
             return (
               <Pressable 
                 key={tab} 
                 onPress={() => setActiveTab(tab)}
                 style={[styles.segmentButton, isActive && { backgroundColor: isDark ? colors['surface-container-highest'] : colors.surface }]}
               >
                 <Text style={[typography.labelLarge, { color: isActive ? colors.primary : colors['on-surface-variant'], textTransform: 'capitalize' }]}>
                   {tab}
                 </Text>
               </Pressable>
             );
          })}
        </View>
      </View>

      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}>
        {activeTab === 'prompt' && renderPromptTab()}
        {activeTab === 'sketch' && renderSketchTab()}
        {activeTab === 'template' && (
           <View style={styles.tabContent}>
             <Text style={[typography.bodyLarge, { color: colors['on-surface-variant'], textAlign: 'center', marginTop: spacing.xxxl }]}>
               Browse templates from the Templates tab in Forge.
             </Text>
           </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.md,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  segmentedControl: {
    flexDirection: 'row',
    height: 48,
    borderRadius: borderRadius.large,
    padding: spacing.xs,
  },
  segmentButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.medium,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
  },
  tabContent: {
    flex: 1,
  },
  promptInput: {
    marginBottom: spacing.md,
  },
  assistScroll: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  generateButton: {
    marginTop: spacing.xl,
  },
  uploadZone: {
    height: 200,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: borderRadius.large,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  }
});
