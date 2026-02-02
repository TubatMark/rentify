import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx: any) => {
    return await ctx.db.query("activities").order("desc").take(20);
  },
});

export const log = mutation({
  args: {
    type: v.string(),
    vehicleId: v.id("vehicles"),
    vehicleName: v.string(),
    description: v.string(),
  },
  handler: async (ctx: any, args: any) => {
    await ctx.db.insert("activities", {
      ...args,
      timestamp: new Date().toISOString(),
    });
  },
});
