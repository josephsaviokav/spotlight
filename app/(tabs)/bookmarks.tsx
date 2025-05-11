import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '../../styles/feed.style'
import { useQuery } from 'convex/react'
import { Loader } from '@/components/Loader';
import { api } from '@/convex/_generated/api'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { COLORS } from '@/constants/theme';
import { ScrollView } from 'react-native-gesture-handler';
import { Image } from 'expo-image';


export default function Bookmarks() {
  const BookmarkedPosts=useQuery(api.bookmarks.getBookmarkedPosts);
  if(BookmarkedPosts===undefined) return <Loader/>;
  if(BookmarkedPosts.length===0) return <NoBookmarksFound/>;
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bookmarks</Text>
        </View>
{/*Posts*/}
<ScrollView
contentContainerStyle={{
  paddingBottom: 8,
  flexDirection: 'row',
  flexWrap: 'wrap',
}}
>
{BookmarkedPosts.map((post) => {

  if(!post) return null;
return (
  <View key={post._id} style={{width: "33.33%", padding: 1}}>
    <Image
    source={post.imageurl}
    style={{width:"100%", aspectRatio: 1}}
    contentFit="cover"
    transition={200}
    cachePolicy="memory-disk"
    />
  </View>
);

})}
  </ScrollView>
    </View>
  );
  
}
function NoBookmarksFound() {
  return (
    <View 
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.background,
    }}>
      <Text
        style={{
          fontSize: 18,
          color: "white",
        }}>
        No Bookmarks Found
      </Text>
    </View>
  )
}

