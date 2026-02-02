import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx: any) => {
    return await ctx.db.query("bookings").collect();
  },
});

export const add = mutation({
  args: {
    vehicleId: v.id("vehicles"),
    renterName: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    status: v.string(),
    totalPrice: v.number(),
    pickupTime: v.optional(v.string()),
    paymentStatus: v.string(),
  },
  handler: async (ctx: any, args: any) => {
    await ctx.db.insert("bookings", args);
  },
});
