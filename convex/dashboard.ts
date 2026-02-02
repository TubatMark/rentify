import { query } from "./_generated/server";

export const getStats = query({
  args: {},
  handler: async (ctx: any) => {
    const vehicles = await ctx.db.query("vehicles").collect();
    const bookings = await ctx.db.query("bookings").collect();

    const totalUnits = vehicles.length;
    const activeRentals = bookings.filter((b: any) => b.status === "confirmed").length; // Simplified active logic
    const availableUnits = vehicles.filter((v: any) => v.status === "available").length;
    const totalEarnings = bookings.reduce((sum: number, b: any) => sum + b.totalPrice, 0);

    return {
      totalUnits,
      activeRentals,
      availableUnits,
      totalEarnings,
    };
  },
});
