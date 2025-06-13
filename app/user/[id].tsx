import { View, Text, TouchableOpacity } from 'react-native'
import React, { use } from 'react'
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { useLocalSearchParams } from 'expo-router';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { Loader } from '@/components/Loader';
import { styles } from '@/styles/profile.styles';
import { Ionicons } from '@expo/vector-icons';
import { FlatList, Pressable, ScrollView } from 'react-native-gesture-handler';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
export default function UserProfileScreen() {
    const router=useRouter();
    const {id}=useLocalSearchParams()
const profile=useQuery(api.users.getUserProfile,{id:id as Id<"users">});
const posts=useQuery(api.posts.getPostByUser,{userId:id as Id<"users">});
const isFollowing=useQuery(api.users.isFollowing,{followingId:id as Id<"users">}); 
const toggleFollow = useMutation(api.users.toggleFollow);
const handdleback=()=>{
    if(router.canGoBack()) router.back();
    else router.replace("/(tabs)");
}
if(profile===undefined || posts===undefined || isFollowing===undefined ){
    return <Loader/>;
}

return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={handdleback}>
                <Ionicons name="arrow-back" size={28} color="grey" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{profile.username}</Text>
            <View style={{width:30}}>
                </View>
</View>
<ScrollView showsVerticalScrollIndicator={false}>   
<View style={styles.profileInfo}>
    <View style={styles.avatarAndStats}>
        <Image
        source={profile.Image}
        style={styles.avatar}
        contentFit="cover"
        transition={200}    
        cachePolicy="memory-disk"
        />
<View style={styles.statsContainer}>
<View style={styles.statItem}>
    <Text style={styles.statNumber}>{profile.posts}</Text>
    <Text style={styles.statLabel}>Posts</Text>
</View>
<View style={styles.statItem}>
    <Text style={styles.statNumber}>{profile.followers}</Text>
    <Text style={styles.statLabel}>Followers</Text>
</View>
<View style={styles.statItem}>
    <Text style={styles.statNumber}>{profile.following}</Text>
    <Text style={styles.statLabel}>Following</Text>
</View>
</View>


        </View>
        <Text style={styles.name}>{profile.fullname}</Text>
        {profile.bio && <Text style={styles.bio}>{profile.bio}</Text>}
       <Pressable 
       style={[styles.followButton, isFollowing && styles.followingButton]}
       onPress={() => toggleFollow({ followingId: id as Id<"users"> })}>
        <Text style={[styles.followButtonText, isFollowing && styles.followingButtonText]}>
            {isFollowing ? "Following" : "Follow"}
                    </Text>
 
                </Pressable>

       
        </View>
        <View style={styles.postsGrid}>
            {posts.length === 0 ? (
                <View style={styles.noPostsContainer}>
                    <Ionicons name="image-outline" size={48} color="grey" />
                    <Text style={styles.noPostsText}>No Posts yet</Text>
                    </View>
            ):(
                <FlatList
                data={posts}
                numColumns={5}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <Image
                    source={item.imageurl}
                    style={styles.gridImage}
                    contentFit="cover"
                    transition={200}
                    cachePolicy="memory-disk"
                    />
                )}
                
                keyExtractor={(item) => item._id}
                />


            )}
            </View>
</ScrollView>
        </View>
  )
}