import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '../../styles/auth.style'
import { useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { useState } from 'react'

export default function createScreen() {
  const router = useRouter()
  const {user}=useUser()
  const [caption,setcaption]=React.useState('');
  const [selectedImage,setselectedImage]=useState<string | null>(null);
  const [isSharing,setisSharing]=useState(false);


  return (
    <View style={styles.container}>
      <Text>create</Text>
    </View>
  )
}