import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Create a new user
export const register = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    role: v.string(),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (existingUser) {
      throw new Error("User already exists");
    }

    const userId = await ctx.db.insert("users", args);
    return userId;
  },
});
