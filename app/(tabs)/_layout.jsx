import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import { MaterialSymbolsOutlined } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { typography, borderRadius, spacing } from '../../lib/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function CustomTabBar({ state, descriptors, navigation }) {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.tabBarContainer}>
      <BlurView 
        intensity={80} 
        tint={isDark ? 'dark' : 'light'} 
        style={[styles.tabBar, { paddingBottom: insets.bottom || spacing.md }]}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.title !== undefined ? options.title : route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          let iconName;
          if (route.name === 'index') iconName = 'build';
          else if (route.name === 'apps') iconName = 'grid_view';
          else if (route.name === 'templates') iconName = 'auto_awesome';
          else if (route.name === 'profile') iconName = 'person';

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={styles.tabItem}
            >
              <View style={[styles.iconContainer, isFocused && { backgroundColor: `${colors.primary}26` }]}>
                <MaterialSymbolsOutlined 
                  name={iconName} 
                  size={24} 
                  color={isFocused ? colors.primary : colors['on-surface-variant']} 
                  style={isFocused && styles.filledIcon}
                />
              </View>
              <Text style={[
                typography.monoLabel, 
                { color: isFocused ? colors.primary : colors['on-surface-variant'], marginTop: 4 }
              ]}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </BlurView>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs 
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: 'Forge' }} />
      <Tabs.Screen name="apps" options={{ title: 'Apps' }} />
      <Tabs.Screen name="templates" options={{ title: 'Templates' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
  },
  tabBar: {
    flexDirection: 'row',
    height: 80, // Approximate height before insets
    borderTopLeftRadius: borderRadius.extraLarge,
    borderTopRightRadius: borderRadius.extraLarge,
    overflow: 'hidden',
    paddingTop: spacing.sm,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 64,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // In a real app we might load filled variants of symbols, here we simulate by just active color
  filledIcon: {
    // some styling could go here if we wanted variant="solid" simulation
  }
});
