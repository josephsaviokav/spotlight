import { View, Text } from 'react-native'
import { api } from '@/convex/_generated/api'
import React, { use } from 'react'
import { styles } from '../../styles/profile.styles'
import { useAuth } from '@clerk/clerk-expo'
import { useState } from 'react'
import { useQuery } from 'convex/react'
import { Doc } from '@/convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { Loader } from '@/components/Loader'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { Image } from 'expo-image'
import { Modal } from 'react-native'

export default function profile() {
  const {signOut,userId}=useAuth();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
const currentUser = useQuery(api.users.getUserByClerkId, userId ? {clerkId:userId} : "skip");
const [editedProfile, setEditedProfile] = useState({
  fullname: currentUser?.fullname || '',
 
  bio: currentUser?.bio || '',
});
const [selectedPost, setSelectedPost] = useState<Doc<"posts"> | null>(null);
 const posts=useQuery(api.posts.getPostByUser,{});
 const updateProfile=useMutation(api.users.updateProfile);
 const handleSaveProfile = async () => {
   
 }
 if(!currentUser || posts===undefined) return <Loader/>
return (
    <View style={styles.container}>
     /*Header*/
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.username}>{currentUser.username}</Text>
          </View>
          <View style={styles.headerRight}>
        <TouchableOpacity style={styles.headerIcon} onPress={() => signOut()}>
          <Ionicons name="log-out-outline" size={28} color="grey" />
        </TouchableOpacity>
        </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} >
          <View style={styles.profileInfo}>
            {/*Profile Picture*/}
            <View style={styles.avatarAndStats}>
              <View style={styles.avatarContainer}>
                <Image
                  source={ currentUser.Image }
                  style={styles.avatar}
                  contentFit="cover"
                  transition={200}
                />
                </View>
                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{currentUser.posts}</Text>
                    <Text style={styles.statLabel}>Posts</Text>
                    </View>
                    <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{currentUser.followers}</Text>
                    <Text style={styles.statLabel}>Followers</Text>
                    </View>
                    <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{currentUser.following}</Text>
                    <Text style={styles.statLabel}>Following</Text>
                    </View>

                    </View>
              </View>
              <Text style={styles.name}>{currentUser.fullname}</Text>
              {currentUser.bio && <Text style={styles.bio}>{currentUser.bio}</Text>}
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.editButton} onPress={() => setIsEditModalVisible(true)}>
                  <Text style={styles.editButtonText}>Edit Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.shareButton} >
                  <Ionicons name="share-outline" size={24} color="grey" />
                  </TouchableOpacity>
                  </View>
            </View>
            {posts.length===0 && <NoPostsFound/>}
            <FlatList 
            data={posts}
            numColumns={3}
            scrollEnabled={false}
            renderItem={({item})=>
            (
              <TouchableOpacity style={styles.gridItem} onPress={() => setSelectedPost(item)}>
                <Image
                source={item.imageurl}
                style={styles.gridImage}
                contentFit="cover"
                transition={200}
                />
                </TouchableOpacity>
)}
/>
            
        </ScrollView>
        {/*Edit Modal*/}




        
        {/*selected Image Modal*/}
        <Modal 
        visible={!!selectedPost}
        animationType="slide"
        transparent={true}
        
        onRequestClose={() => setSelectedPost(null)}
        >
          <View style={styles.modalBackdrop}>
            {selectedPost && (
              
              <View style={styles.postDetailContainer}>
                <View style={styles.postDetailHeader}>
                  <TouchableOpacity onPress={() => setSelectedPost(null)}>
                    <Ionicons name="close" size={32} color="white" />
                  </TouchableOpacity>
                  </View>
                  <Image
                  source={selectedPost.imageurl}
                  style={styles.postDetailImage}
                  contentFit="cover"
                  transition={200}
                  />
                  </View>
            )}
</View>
        </Modal>
    </View>
  )
}
function NoPostsFound() {
  return (
    <View style={[styles.container, styles.centered]}>
      <Ionicons name="image-outline" size={48} color="grey" />
      <Text style={{ fontSize: 20, color: 'white' }}>No Posts Found</Text>
    </View>
  );
}