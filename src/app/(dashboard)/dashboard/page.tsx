"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Skeleton } from "@/components/ui/Skeleton";
import { 
  Users, 
  Car, 
  CheckCircle, 
  Wallet,
  ArrowUpRight,
  MoreHorizontal
} from "lucide-react";

export default function DashboardPage() {
  const statsData = useQuery(api.dashboard.getStats);
  const activities = useQuery(api.activities.list);

  if (statsData === undefined || activities === undefined) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-40 rounded-2xl" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Skeleton className="lg:col-span-2 h-80 rounded-2xl" />
          <Skeleton className="h-80 rounded-2xl" />
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Total Rental Units", value: statsData?.totalUnits?.toString() || "0", icon: Car, color: "bg-blue-50 text-blue-600", trend: "+12%" },
    { label: "Active Rentals", value: statsData?.activeRentals?.toString() || "0", icon: Users, color: "bg-indigo-50 text-indigo-600", trend: "+5%" },
    { label: "Units Available", value: statsData?.availableUnits?.toString() || "0", icon: CheckCircle, color: "bg-emerald-50 text-emerald-600", trend: "0%" },
    { label: "Total Earnings", value: `₱${(statsData?.totalEarnings || 0).toLocaleString()}`, icon: Wallet, color: "bg-orange-50 text-orange-600", trend: "+15%" },
  ];

  const mostRented = [
    { name: "Toyota Vios", trips: 18, color: "bg-indigo-500", percentage: "85%" },
    { name: "Honda Civic", trips: 12, color: "bg-indigo-400", percentage: "65%" },
    { name: "Mitsubishi Mirage", trips: 9, color: "bg-indigo-300", percentage: "45%" },
    { name: "Nissan Almera", trips: 6, color: "bg-indigo-200", percentage: "30%" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Overview</p>
        <h2 className="text-3xl font-bold text-slate-900">Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group cursor-default">
            <div className="flex items-start justify-between">
              <div className={stat.color + " p-3 rounded-xl transition-transform group-hover:scale-110"}>
                <stat.icon size={24} />
              </div>
              <span className="flex items-center gap-0.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                <ArrowUpRight size={14} />
                {stat.trend}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Earnings Over Time Chart */}
        <div className="lg:col-span-2 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Earnings over time</h3>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900">₱ 125,450</span>
                <span className="text-sm font-medium text-emerald-600">+15% vs last month</span>
              </div>
            </div>
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>
          
          <div className="relative w-full h-64">
            <svg className="overflow-visible" height="100%" preserveAspectRatio="none" viewBox="0 0 800 300" width="100%">
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.2"></stop>
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              <line stroke="#f1f5f9" strokeWidth="1" x1="0" x2="800" y1="250" y2="250"></line>
              <line stroke="#f1f5f9" strokeWidth="1" x1="0" x2="800" y1="190" y2="190"></line>
              <line stroke="#f1f5f9" strokeWidth="1" x1="0" x2="800" y1="130" y2="130"></line>
              <line stroke="#f1f5f9" strokeWidth="1" x1="0" x2="800" y1="70" y2="70"></line>
              <path
                d="M0,220 C100,220 150,150 200,160 C250,170 300,200 350,180 C400,160 450,80 500,100 C550,120 600,150 650,130 C700,110 750,50 800,80 V300 H0 Z"
                fill="url(#chartGradient)"
              ></path>
              <path
                d="M0,220 C100,220 150,150 200,160 C250,170 300,200 350,180 C400,160 450,80 500,100 C550,120 600,150 650,130 C700,110 750,50 800,80"
                fill="none"
                stroke="#4f46e5"
                strokeLinecap="round"
                strokeWidth="3"
              ></path>
            </svg>
            <div className="mt-4 flex justify-between text-xs font-medium text-slate-400">
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </div>
        </div>

        {/* Most Rented Vehicles */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">Most Rented</h3>
            <p className="text-sm text-slate-500">Top performing vehicles this month</p>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-5">
            {mostRented.map((item, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="flex justify-between text-sm font-semibold text-slate-700">
                  <span>{item.name}</span>
                  <span className="text-slate-900">{item.trips} trips</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div 
                    className={`h-2.5 rounded-full ${item.color} transition-all duration-1000 ease-out`} 
                    style={{ width: item.percentage }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-lg mb-6">Recent Activity</h3>
        <div className="space-y-6">
          {activities.map((activity: any) => (
            <div key={activity._id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-indigo-50" />
                <div className="w-0.5 h-full bg-slate-100 mt-1" />
              </div>
              <div className="pb-4">
                <p className="text-sm font-semibold text-slate-900">{activity.description}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {activity.vehicleName} • {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <button className="w-full py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
            View All Logs
          </button>
        </div>
      </div>
    </div>
  );
}
