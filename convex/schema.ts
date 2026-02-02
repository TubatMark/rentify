import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  vehicles: defineTable({
    name: v.string(),
    model: v.string(),
    type: v.string(), // 'Car' | 'Van' | 'Motorcycle' | 'Bus' | 'Other'
    pricePerDay: v.number(),
    status: v.string(), // 'available' | 'rented' | 'maintenance'
    image: v.optional(v.string()),
    capacity: v.optional(v.number()),
    plateNumber: v.string(),
    lastMaintenance: v.optional(v.string()),
    ownerId: v.optional(v.string()), // For future multi-tenant support
  }),
  bookings: defineTable({
    vehicleId: v.id("vehicles"),
    renterName: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    status: v.string(), // 'confirmed' | 'pending' | 'cancelled' | 'completed'
    totalPrice: v.number(),
    pickupTime: v.optional(v.string()),
    paymentStatus: v.string(), // 'paid' | 'pending' | 'partial'
  }),
  activities: defineTable({
    type: v.string(), // 'rental_start' | 'rental_end' | 'update' | 'maintenance_flag'
    vehicleId: v.id("vehicles"),
    vehicleName: v.string(),
    timestamp: v.string(),
    description: v.string(),
  }),
  users: defineTable({
    name: v.string(),
    email: v.string(),
    role: v.string(), // 'owner' | 'admin'
    image: v.optional(v.string()),
  }),
});
