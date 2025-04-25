import { useAuth } from "@clerk/clerk-expo"
import { Stack, useRouter, useSegments } from "expo-router"
import { useEffect } from "react"

export default function Initial_layout() {
  const {isLoaded,isSignedIn}=useAuth();
  const segments= useSegments();
  // /
  // /auth/login
  const router=useRouter();
  useEffect(()=>{
    if(!isLoaded) return;
    const inAuthScreen = segments[0] === "(auth)";
    if(!isSignedIn && !inAuthScreen){
      router.replace("/(auth)/login") 
    }
    else if(isSignedIn && inAuthScreen){
        router.replace("/(tabs)")
      }
  },[isLoaded,isSignedIn,segments]);
  if (!isLoaded) return null;

  return <Stack screenOptions={{headerShown: false}}/>;
}