import {View,Text, KeyboardAvoidingView, FlatListComponent} from "react-native";
import {Id} from "@/convex/_generated/dataModel";
import { useState } from "react";
import { useQuery,useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Modal,FlatList,TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/feed.style";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { TextInput } from "react-native-gesture-handler";
import { Platform } from "react-native";
import { Loader } from "./Loader";
import Comment from "./Comment";

type CommentsModel={
postId:Id<"posts">,
visible:boolean,
onClose:()=>void,
onCommentAdded:()=>void,

}

    export default function CommentsModel({onClose,visible,postId,onCommentAdded}:CommentsModel) {
   const [newcomment,setNewComment]=useState("");
        const comments=useQuery(api.comments.getComments,{postId});
        const addComment=useMutation(api.comments.addComment);
       const handleAddComment=async()=>{
        if(newcomment.trim()==="")return;
       try { await addComment({postId,content:newcomment});
        setNewComment("");
        onCommentAdded();
        
       }
         catch (error) {
          console.error("Error adding comment:", error);
         }
         };
       return (
      <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
       <KeyboardAvoidingView
       behavior={Platform.OS==="ios"?"padding":"height"}
         style={styles.modalContainer}
         ><View style={styles.modalHeader}>
             <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color="grey" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Comments</Text>
                <View style={{width:24}}/>
                </View>
                {comments===undefined?(
                        <Loader/>
                ):(
                    <FlatList
                    data={comments}
                    keyExtractor={(item)=>item._id}
                    renderItem={({item}) =><Comment comment={item}/>}
                contentContainerStyle={styles.commentsList}
                />

                )
                
                }
                <View  style={styles.commentInput}>
                    <TextInput
                    style={styles.input}
                    placeholder="Add a comment"
                    value={newcomment}
                    onChangeText={setNewComment}
                    placeholderTextColor={"grey"}
                    multiline
                    />
                    <TouchableOpacity
                    onPress={handleAddComment}
                    disabled={!newcomment.trim()}>
                    <Text style={[styles.postButton,!newcomment.trim() && styles.postButtonDisabled]}>
                        Post
                        </Text>
                    </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>


        
      </Modal>
        
    )
}

