import {View,Text,TouchableOpacity} from "react-native";
import {styles} from "@/styles/feed.style";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import CommentsModel from "./CommentsModel";
import {formatDistanceToNow} from 'date-fns';
//todo:add the actual type
type postProps={
    post:{
        _id:Id<"posts">,
        imageurl:string,
        caption:string,
        likes:number,
        comments:number,
        _creationTime:number,
        isLiked:boolean,
        isBookmarked:boolean,
        author:{
            _id:string,
            username:string,
            image:string,
        },
    }
};

export default function Post({post}:postProps) {
  const [isLiked,setIsLiked]=useState(post.isLiked);
  const [likesCount,setLikesCount]=useState(post.likes);
  const [commentsCount,setCommentsCount]=useState(post.comments);
  const [showcomments,setShowComments]=useState(false);
  const toggleLike=useMutation(api.posts.toggleLike);
  const handleLike=async()=>{
    try {
     const newIsLiked=   await toggleLike({postId:post._id});
        setIsLiked(newIsLiked);
  }catch (error) {
    console.log("Error toggling like:",error);

  }
}

  return (
    <View style={styles.post}>
        {/*Post Header */}
        <View style={styles.postHeader}>
          <Link href={"/(tabs)/notifications"}>
          <TouchableOpacity style={styles.postHeaderLeft}>
            <Image
            source={post.author.image}
            style={styles.postAvatar}
            contentFit="cover"
            transition={200}
            cachePolicy="memory-disk"
            />
            <Text style={styles.postUsername}>{post.author.username}</Text>
          </TouchableOpacity>

          </Link>
          {/*todo:fix it later*/}
          <TouchableOpacity >
            <Ionicons name="trash-outline" size={24} color="grey" />
            </TouchableOpacity>
          
        </View>
        {/*Post Image */}
        <Image
        source={post.imageurl}
        style={styles.postImage}
        contentFit="cover"
        transition={200}
        cachePolicy="memory-disk"
        />
        {/*Post Actions */}
        <View style={styles.postActions}>
            <View style={styles.postActionsLeft}>
                <TouchableOpacity style={{flexDirection:"row",alignItems:"center",gap:3,marginTop:4}} onPress={handleLike}>
                <Ionicons name={isLiked?"heart":"heart-outline"} size={24} color={isLiked?"red":"grey"}  />
                <Text style={styles.likesText}>{post.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:"row",alignItems:"center",gap:3}} onPress={()=>setShowComments(true)}>
                <Ionicons name="chatbubble-outline" size={24} color="grey" />
                <Text style={styles.commentText}>
                {post.comments} </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Ionicons name="paper-plane-outline" size={24} color="grey" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity>
                <Ionicons name="bookmark-outline" size={24} color="grey" />
            </TouchableOpacity>
        </View>
        {/*Post Info */}
        <View style={styles.postInfo}>
            {/* <Text style={styles.likesText}>{post.likes} likes</Text> */}
            {post.caption && (
                <View style={styles.captionContainer}>
                    <Text style={styles.captionUsername}>
                        {post.author.username}</Text>
                    <Text style={styles.captionText}>{post.caption}</Text>
                </View>
            )}
            {/* <TouchableOpacity>
                <Text style={styles.commentText}>
                    View all {post.comments} comments</Text>
            </TouchableOpacity> */}
            {/*Post Date */}
            <Text style={styles.timeAgo}>
            {formatDistanceToNow(post._creationTime, {addSuffix: true})}
        </Text>
           
            {/*Post Comments */}
        </View>
        <CommentsModel
        postId={post._id}
        visible={showcomments}
        onClose={() => setShowComments(false)}
        onCommentAdded={() => {
            setCommentsCount((prev) => prev + 1);
        }}
        />
           
        

        </View>
  )
}

