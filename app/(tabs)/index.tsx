import { Pressable, Text, TouchableOpacity, View,Image} from "react-native";
import {styles} from "../../styles/feed.style";
import { Link } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader } from "@/components/Loader";
import { FlatList, ScrollView } from "react-native";
import { NoPostsFound } from "@/components/NoPostsFound";
import  Post  from "@/components/Post";
export default function Index() {
  const {signOut}=useAuth();
  const posts=useQuery(api.posts.getFeed);
  if(posts===undefined) return <Loader/>
  //if(posts.length===0) return <NoPostsFound/>
  
  return (
    <View style={styles.container}>
      {/*Header*/}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Spotlight</Text>
        <TouchableOpacity onPress={() => signOut()}>
          <Ionicons name="log-out-outline" size={28} color="grey" />
        </TouchableOpacity>
        </View>
        
        <FlatList 
        data={posts}
        renderItem={({item})=>
          <Post post={{ ...item, caption: item.caption || '' }} />
      }
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 60,
        }}/>
        
     
        {/*         
        <ScrollView showsVertical-ScrollIndicator={false} 
        contentContainerStyle={{
          paddingBottom: 60}}>
          
          {posts.map((post) => (
  <Post key={post._id} post={{ ...post, caption: post.caption || '' }} />
))}

        </ScrollView> */}
      
    </View>
  );
}

