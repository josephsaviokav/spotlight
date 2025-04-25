import { StatusBar } from 'expo-status-bar';
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Initial_layout from "@/components/initial_layout"
import { Clerk } from '@clerk/clerk-expo';
import ClerkAndConvexProvider from '@/providers/ClerkAndConvexProvider';
export default function RootLayout() {
  return (
   <ClerkAndConvexProvider>
    <SafeAreaProvider>
      <StatusBar style="light" /> {/* This makes status bar icons light (white) */}
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
 
        <Initial_layout />
      </SafeAreaView>
    </SafeAreaProvider>
    </ClerkAndConvexProvider>
   
  );
}