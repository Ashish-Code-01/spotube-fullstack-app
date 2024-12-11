import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack, useRouter, useSegments } from 'expo-router';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import 'react-native-reanimated';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your environment.');
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (fontError) {
      console.error('Font loading error:', fontError);
      SplashScreen.hideAsync();
    }
  }, [fontError]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!isLoaded) return;

  const inTabsGroup = segments[0] === '(auth)';

  if (isSignedIn && !inTabsGroup) {
    router.replace('/(tabs)/index');
  } else if (!isSignedIn) {
    router.replace('/');
  }
} [isSignedIn];

if (!fontsLoaded) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#25D366" />
    </View>
  );


  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <RootLayoutNav />
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="otp" options={{ headerTitle: 'Enter Your Phone Number' }} />
      <Stack.Screen name="(tabs)/index" options={{ headerTitle: 'Chats', headerShown: true }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
});
