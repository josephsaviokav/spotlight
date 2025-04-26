import { mutation } from "./_generated/server";
import { v } from "convex/values";

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
        const identity=await ctx.auth.getUserIdentity();
        if(!identity) throw new Error("Unautherized");
        const currentUser=await ctx.db.query("users").withIndex("by_clerk_id",q=>q.eq("clerkId",identity.subject)).first();
    if(!currentUser) throw new Error("User not found");
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