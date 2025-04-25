import { Pressable, Text, TouchableOpacity, View,Image} from "react-native";
import {styles} from "../../styles/auth.style";
import { Link } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { Tabs } from "expo-router";

export default function Index() {
  const {signOut}=useAuth();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => signOut()}>
        <Text style={{ color: 'blue', fontSize: 16,textAlign:'center',top:50 }}>Sign Out</Text>
      </TouchableOpacity>
      
    </View>
  );
}
