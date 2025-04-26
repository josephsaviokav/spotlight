import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";
export default defineSchema({
    users:defineTable({ 
        username:v.string(),
        fullname:v.string(),
        email:v.string(),
        bio:v.optional(v.string()),
        Image:v.string(),
        followers:v.number(),
        following:v.number(),
        posts:v.number(),
        clerkId:v.string(),
    }).index("by_clerk_id", ["clerkId"]),
    //get user by clerkId
    posts:defineTable({
     userId:v.id("users"),
     imageurl:v.string(),
     storageId:v.id("_storage"),//needed for deleting the image from storage
        caption:v.optional(v.string()),
        likes:v.number(),
        comments:v.number(),

    
    }).index("by_user", ["userId"]),
    likes:defineTable({
        userId:v.id("users"),
        postId:v.id("posts"),
    }).index("by_post", ["postId"])
    .index("by_user_and_post", ["userId", "postId"]),
    comments:defineTable({
        userId:v.id("users"),
        postId:v.id("posts"),
        content:v.string(),
    }).index("by_post", ["postId"]),
    follows:defineTable({
        followerId:v.id("users"),
        followingId:v.id("users"),  
    })
    .index("by_follower", ["followerId"])
    .index("by_following", ["followingId"])
    .index("by_both", ["followerId", "followingId"]),

    Notifications:defineTable({
        receiverId:v.id("users"),
        senderId:v.id("users"),
        type:v.union(v.literal("follow"),v.literal("like"),v.literal("comment")),
        postId:v.optional(v.id("posts")),
        commentId:v.optional(v.id("comments")),
    }).index("by_receiver", ["receiverId"]),
    bookmarks:defineTable({
        userId:v.id("users"),
        postId:v.id("posts"),
    }).index("by_user", ["userId"])
    .index("by_post", ["postId"])
    .index("by_user_and_post", ["userId", "postId"]),
 

    });



