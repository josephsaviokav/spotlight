import { View, Text, Pressable,Image, Touchable,TouchableOpacity } from 'react-native'
import React from 'react'
import {styles} from "@/styles/auth.style" 
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { COLORS } from '@/constants/theme'
import { useSSO } from '@clerk/clerk-expo'

export default function Login() {
    const {startSSOFlow} = useSSO()
    const router = useRouter();

    const handleGoogleLogin = async() => {
        try{
           const {createdSessionId,setActive} = await startSSOFlow({strategy: 'oauth_google'})
            if(setActive && createdSessionId){
                setActive({session:createdSessionId})
                router.replace("/(tabs)")
            }

        }catch(error){
            console.error("OAuth error:",error)
    }
}
  return (
    <View style={styles.container}>
      <View style={styles.brandSection}>
        <View style={styles.logoContainer}>
          <Ionicons name="leaf" size={32} color={COLORS.primary} />
        </View>
        <Text style={styles.appName}>Spotlight</Text>
        <Text style={styles.tagline}>Don't miss anything</Text>
      </View>
      <View style={styles.illustrationContainer}>
        <Image
          source={require("../../assets/images/bro.png")}
          style={styles.illustration}
          resizeMode='cover'
        />
      </View>
      <View style={styles.loginSection}>
        <TouchableOpacity style={styles.googleButton}
          onPress={handleGoogleLogin}
            activeOpacity={0.8}>
                <View style={styles.googleIconContainer}>
                    <Ionicons name="logo-google" size={20} color={COLORS.surface} />
                </View>
                <Text style={styles.googleButtonText}>Login with Google</Text>
            </TouchableOpacity>
            <Text style={styles.termsText}>
            By continuing, you agree to our Terms of Service and Privacy Policy</Text>
           </View> 
    </View>
  );
}


