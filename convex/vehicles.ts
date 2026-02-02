import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// List all vehicles
export const list = query({
  args: {},
  handler: async (ctx: any) => {
    return await ctx.db.query("vehicles").collect();
  },
});

// Add a new vehicle
export const add = mutation({
  args: {
    name: v.string(),
    model: v.string(),
    type: v.string(),
    pricePerDay: v.number(),
    status: v.string(),
    plateNumber: v.string(),
    capacity: v.optional(v.number()),
    image: v.optional(v.string()),
  },
  handler: async (ctx: any, args: any) => {
    await ctx.db.insert("vehicles", args);
  },
});

// Update vehicle details
export const update = mutation({
  args: {
    id: v.id("vehicles"),
    name: v.optional(v.string()),
    model: v.optional(v.string()),
    type: v.optional(v.string()),
    pricePerDay: v.optional(v.number()),
    status: v.optional(v.string()),
    plateNumber: v.optional(v.string()),
    capacity: v.optional(v.number()),
    image: v.optional(v.string()),
  },
  handler: async (ctx: any, args: any) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

// Update vehicle status
export const updateStatus = mutation({
  args: {
    id: v.id("vehicles"),
    status: v.string(),
  },
  handler: async (ctx: any, args: any) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});

// Delete a vehicle
export const remove = mutation({
  args: {
    id: v.id("vehicles"),
  },
  handler: async (ctx: any, args: any) => {
    await ctx.db.delete(args.id);
  },
});
