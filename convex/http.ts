import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";



const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

    if (!webhookSecret) {
      throw new Error("Missing webhook secret environment variable");
    }

    // Log and inspect all headers
    const headers = Object.fromEntries(request.headers.entries());
    console.log("📩 Incoming webhook headers:", headers);

    // Extract headers exactly as Clerk sends them
    const svix_id = headers["svix-id"];
    const svix_signature = headers["svix-signature"];
    const svix_timestamp = headers["svix-timestamp"];

    if (!svix_id || !svix_signature || !svix_timestamp) {
      console.error("❌ Missing Svix headers:", { svix_id, svix_signature, svix_timestamp });
      return new Response("Missing Svix headers", { status: 400 });
    }

    // Get raw body text (needed for Svix signature verification)
    const body = await request.text();
    console.log("📝 Raw body:", body);

    const wh = new Webhook(webhookSecret);
    let event: any;

    try {
      event = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      });
    } catch (error) {
      console.error("❌ Webhook verification failed:", error);
      return new Response("Invalid signature", { status: 400 });
    }

    console.log("✅ Webhook verified:", event.type);

    if (event.type === "user.created") {
      const { id, email_addresses, first_name, last_name, image_url } = event.data;
      const email = email_addresses[0].email_address;
      const name = `${first_name || ""} ${last_name || ""}`.trim();

      try {
        await ctx.runMutation(api.users.createUser, {
          username: email.split("@")[0],
          fullname: name,
          image: image_url,
          email,
          clerkId: id,
        });
        console.log("👤 User created in Convex:", email);
      } catch (error) {
        console.error("❌ Error creating user in Convex:", error);
        return new Response("Error creating user", { status: 500 });
      }
    }

    return new Response("Webhook processed successfully", { status: 200 });
  }),
});

export default http;

