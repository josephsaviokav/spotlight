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
            const postAuthor=await ctx.db.get(post.userId);
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
