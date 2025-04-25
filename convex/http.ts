import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";
import { mutation } from "./_generated/server";
import {createUser} from "./users";

const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

    if (!webhookSecret) {
      throw new Error("Missing webhook secret environment variable");
    }

    // Headers required for Svix verification
    const svixId = request.headers.get("svix-id");
    const svixSig = request.headers.get("svix-signature");
    const svixTimestamp = request.headers.get("svix-timestamp");

    if (!svixId || !svixSig || !svixTimestamp) {
      return new Response("Missing Svix headers", { status: 400 });
    }

    // Get and stringify request body
    const payload = await request.json();
    const body = JSON.stringify(payload);

    // Verify the webhook signature
    const webhook = new Webhook(webhookSecret);
    let event: any;

    try {
      event = webhook.verify(body, {
        svix_id: svixId,
        svix_timestamp: svixTimestamp,
        svix_signature: svixSig,
      }) as any;
    } catch (error) {
      console.error("Webhook verification failed:", error);
      return new Response("Invalid signature", { status: 400 });
    }

    const eventType = event.type;

    // Handle user.created event
    if (eventType === "user.created") {
      const { id: clerkId, email_address, first_name, last_name, image_url } = event.data;

      const email = email_address?.[0]?.email_address || "";
      const name = `${first_name || ""} ${last_name || ""}`.trim();

      if (!email) {
        console.error("Email address missing in event data.");
        return new Response("Invalid user data", { status: 400 });
      }

      console.log("Creating user in Convex:", { email, name, image_url, clerkId });

      try {
        await ctx.runMutation(api.users.createUser, {
            username: email.split("@")[0],
            fullname: name,
            image: image_url,
            email,
            clerkId,
          });
      } catch (error) {
        console.error("Error creating user in Convex:", error);
        return new Response("Error creating user", { status: 500 });
      }
    }

    return new Response("Webhook processed successfully", { status: 200 });
  }),
});

export default http;

