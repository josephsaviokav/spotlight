import { StatusBar } from 'expo-status-bar';
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Initial_layout from "@/components/initial_layout"
import { Clerk } from '@clerk/clerk-expo';
import ClerkAndConvexProvider from '@/providers/ClerkAndConvexProvider';
import { SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { use, useCallback } from 'react';
import { useEffect } from 'react';

import * as NavgationBar from 'expo-navigation-bar';
import { Platform } from 'react-native';
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavgationBar.setBackgroundColorAsync('black');
      NavgationBar.setButtonStyleAsync('light');
    }
  }, [fontsLoaded]);
 
        return (
   <ClerkAndConvexProvider>
    <SafeAreaProvider>
      <StatusBar style="light" /> {/* This makes status bar icons light (white) */}
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }} onLayout={onLayoutRootView}>
 
        <Initial_layout />
      </SafeAreaView>
    </SafeAreaProvider>
    </ClerkAndConvexProvider>
   
  );
}