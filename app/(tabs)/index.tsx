import { Pressable, Text, TouchableOpacity, View,Image} from "react-native";
import {styles} from "../../styles/feed.style";
import { Link } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader } from "@/components/Loader";
import { ScrollView } from "react-native-gesture-handler";
import { NoPostsFound } from "@/components/NoPostsFound";
export default function Index() {
  const {signOut}=useAuth();
  const posts=useQuery(api.posts.getFeed);
  if(posts===undefined) return <Loader/>
  if(posts.length===0) return <NoPostsFound/>
  
  return (
    <View style={styles.container}>
      {/*Header*/}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Spotlight</Text>
        <TouchableOpacity onPress={() => signOut()}>
          <Ionicons name="log-out-outline" size={28} color="grey" />
        </TouchableOpacity>
        </View>
        <ScrollView showsVertical-ScrollIndicator={false}>
          {/* {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))} */}

        </ScrollView>
      
    </View>
  );
}

