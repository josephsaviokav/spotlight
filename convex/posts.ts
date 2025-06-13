import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthenticatedUser } from "./users";
import { query } from "./_generated/server";

export const generateUploadUrl = mutation(async(ctx) => {
    const identity=await ctx.auth.getUserIdentity();
    if(!identity) throw new Error("Unautherized");
    return await ctx.storage.generateUploadUrl();
}
);
export const createPost = mutation({
    args:{
        caption:v.optional(v.string()),
        storageId:v.id("_storage"),

    },
    handler: async (ctx,args)=>{
        const currentUser =await getAuthenticatedUser(ctx);

    const imageurl=await ctx.storage.getUrl(args.storageId);
    if(!imageurl) throw new Error("Image not found");
   //create a post with the given caption and storageId
   const postId=await ctx.db.insert("posts",{
    userId:currentUser._id,
    caption:args.caption,
    imageurl,
    storageId:args.storageId,
    likes:0,
    comments:0,
   })
//increment the posts count of the user
await ctx.db.patch(currentUser._id,{
    posts:currentUser.posts+1,
})
return postId;

},
});
export const getFeed = query({
    handler: async (ctx) => {
        const currentUser = await getAuthenticatedUser(ctx);
        //get all posts
        const posts=await ctx.db.query("posts").order("desc").collect();
        if(posts.length===0) return []
        //enhance the posts with the author info and like/bookmark status
        const postsWithInfo=await Promise.all(posts.map(async(post)=>{
            const postAuthor= (await ctx.db.get(post.userId))!;
            const like=await ctx.db.query("likes")
            .withIndex("by_user_and_post", (q) => q.eq("userId", currentUser._id).eq("postId", post._id)).first()
            const bookmark=await ctx.db.query("bookmarks")
            .withIndex("by_user_and_post", (q) => q.eq("userId", currentUser._id).eq("postId", post._id)).first()
            return {
                ...post,
                author:{
                    _id:postAuthor?._id,
                    username:postAuthor?.username,
                    image:postAuthor?.Image,
                },
                isLiked:!!like,
                isBookmarked:!!bookmark,
            };
                }
        ));
        return postsWithInfo;



      
    },
});
export const toggleLike = mutation({
    args:{
        postId:v.id("posts"),
    },
    handler: async (ctx,args)=>{
        const currentUser =await getAuthenticatedUser(ctx);
        const existing=await ctx.db.query("likes")
        .withIndex("by_user_and_post", (q) => q.eq("userId", currentUser._id).eq("postId", args.postId)).first()
  const post=await ctx.db.get(args.postId);
if(!post) throw new Error("Post not found");
if(existing){
    //delete the like
    await ctx.db.delete(existing._id);
    await ctx.db.patch(post._id,{
        likes:post.likes-1,
    });
    return false;
}
    else{
        //create the like
        await ctx.db.insert("likes",{
            userId:currentUser._id,
            postId:post._id,
        });
        await ctx.db.patch(post._id,{
            likes:post.likes+1,
        })
        if (currentUser._id !== post.userId) {
            await ctx.db.insert("Notifications", {
                receiverId: post.userId,
                type: "like",
                senderId: currentUser._id,
                postId: args.postId,
            });
        }
        return true;//return the like status

    }


    },
});
export const deletePost = mutation({
    args: {
        postId: v.id("posts"),
    },
    handler: async (ctx, args) => {
        const currentUser = await getAuthenticatedUser(ctx);
        const post = await ctx.db.get(args.postId);
        if (!post) throw new Error("Post not found");
        if (currentUser._id !== post.userId) throw new Error("Unauthorized");
       //delete likes
       const likes=await ctx.db.query("likes").withIndex("by_post", (q) => q.eq("postId", args.postId)).collect();
       for (const like of likes) {
        await ctx.db.delete(like._id);
       }
       //delete bookmarks
       const bookmarks=await ctx.db.query("bookmarks").withIndex("by_post", (q) => q.eq("postId", args.postId)).collect();
       for (const bookmark of bookmarks) {
        await ctx.db.delete(bookmark._id);
       }
       //delete comments
       const comments=await ctx.db.query("comments").withIndex("by_post", (q) => q.eq("postId", args.postId)).collect();
       for (const comment of comments) {
        await ctx.db.delete(comment._id);
       }
       //delete notifications
       // Fetch notifications by receiverId and filter by postId
       const notifications = await ctx.db.query("Notifications")
         .withIndex("by_receiver", (q) => q.eq("receiverId", post.userId))
         .collect();
       for (const notification of notifications) {
         if (notification.postId === args.postId) {
           await ctx.db.delete(notification._id);
         }
       }
       //delete post
        await ctx.db.delete(args.postId);
        return true;
    },
});

export const getPostByUser=query({
    args: {
        userId: v.optional(v.id("users")),
    },
    handler: async (ctx, args) => {


        const user=args.userId?await ctx.db.get(args.userId):await getAuthenticatedUser(ctx); 
        if (!user) throw new Error("User not found");
        const posts = await ctx.db.query("posts")
            .withIndex("by_user", (q) => q.eq("userId", args.userId || user._id))
            .collect();
        return posts;
    },
});