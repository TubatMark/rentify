"use client";

import React, { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User,
  Plus,
  ArrowRight,
  List,
  Grid,
  CheckCircle2,
  CalendarDays
} from "lucide-react";
import Modal from "@/components/ui/Modal";

// Helper to get days in month
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// Helper to get day of week for the first day
const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

const bookings = [
  { id: 1, title: "Toyota Vios - John Doe", date: "2024-02-15", duration: 3, type: "car", color: "bg-indigo-100 text-indigo-700 border-indigo-200", status: "confirmed", time: "10:00 AM" },
  { id: 2, title: "Hiace Grandia - Company Retreat", date: "2024-02-18", duration: 2, type: "van", color: "bg-purple-100 text-purple-700 border-purple-200", status: "pending", time: "08:00 AM" },
  { id: 3, title: "NMAX - Weekend Trip", date: "2024-02-22", duration: 1, type: "motorcycle", color: "bg-emerald-100 text-emerald-700 border-emerald-200", status: "confirmed", time: "09:00 AM" },
  { id: 4, title: "Bus Rental - School Tour", date: "2024-02-25", duration: 1, type: "bus", color: "bg-amber-100 text-amber-700 border-amber-200", status: "confirmed", time: "06:00 AM" },
];

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Skeleton } from "@/components/ui/Skeleton";

export default function BookingsPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  const [filter, setFilter] = useState<"all" | "pickups" | "returns">("all");

  const bookings = useQuery(api.bookings.list);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleDateClick = (day: number) => {
    setSelectedDate(day);
    setIsBookingModalOpen(true);
  };

  const renderCalendarDays = () => {
    const days = [];
    // Empty slots for previous month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-32 bg-slate-50 border border-slate-100/50"></div>);
    }
    // Days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayBookings = bookings?.filter((b: any) => b.startDate === dateStr) || [];

      days.push(
        <div 
          key={day} 
          onClick={() => handleDateClick(day)}
          className="h-32 bg-white border border-slate-100 p-2 hover:bg-slate-50 transition-colors cursor-pointer group relative"
        >
          <span className={`text-sm font-semibold ${
            day === new Date().getDate() && month === new Date().getMonth() 
              ? "bg-indigo-600 text-white w-7 h-7 flex items-center justify-center rounded-full" 
              : "text-slate-700 group-hover:text-indigo-600"
          }`}>
            {day}
          </span>
          
          <div className="mt-2 space-y-1 overflow-y-auto max-h-[80px] scrollbar-thin">
            {dayBookings.map((booking: any) => (
              <div 
                key={booking._id} 
                className={`text-[10px] font-medium px-2 py-1 rounded border truncate bg-indigo-100 text-indigo-700 border-indigo-200`}
              >
                {booking.renterName}
              </div>
            ))}
          </div>

          <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100">
            <Plus size={14} />
          </button>
        </div>
      );
    }
    return days;
  };

  if (bookings === undefined) {
    return (
      <div className="flex gap-8 h-full">
        <div className="flex-1 space-y-6">
          <div className="flex justify-between">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Skeleton className="h-[600px] w-full rounded-2xl" />
        </div>
        <Skeleton className="hidden lg:block w-80 h-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full">
      {/* Main Calendar Area */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Schedule</p>
            <h2 className="text-3xl font-bold text-slate-900">Bookings</h2>
          </div>
          <div className="flex items-center gap-4">
             {/* View Toggle */}
             <div className="flex bg-slate-100 p-1 rounded-lg">
              <button 
                onClick={() => setViewMode("calendar")}
                className={`p-2 rounded-md transition-all ${viewMode === "calendar" ? "bg-white shadow-sm text-indigo-600" : "text-slate-500 hover:text-slate-700"}`}
              >
                <CalendarDays size={18} />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-all ${viewMode === "list" ? "bg-white shadow-sm text-indigo-600" : "text-slate-500 hover:text-slate-700"}`}
              >
                <List size={18} />
              </button>
            </div>
            
            {/* New Booking Button */}
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">New Booking</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 border-b border-slate-200 pb-4">
          {["all", "pickups", "returns"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
                filter === f 
                ? "bg-slate-900 text-white" 
                : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          {/* Calendar Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50/50">
            <button onClick={prevMonth} className="p-2 hover:bg-white hover:shadow-sm text-slate-600 rounded-lg transition-all border border-transparent hover:border-slate-200">
              <ChevronLeft size={20} />
            </button>
            <span className="text-lg font-bold text-slate-900">
              {monthNames[month]} {year}
            </span>
            <button onClick={nextMonth} className="p-2 hover:bg-white hover:shadow-sm text-slate-600 rounded-lg transition-all border border-transparent hover:border-slate-200">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
              <div key={day} className="py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {renderCalendarDays()}
          </div>
        </div>
      </div>

      {/* Upcoming Operations Sidebar */}
      <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Clock size={18} className="text-indigo-600" />
            Today's Operations
          </h3>
          
          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Upcoming Pickups</p>
              <div className="space-y-3">
                {[1].map((_, i) => (
                  <div key={i} className="flex gap-3 items-start group">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 ring-4 ring-indigo-50 group-hover:ring-indigo-100 transition-all" />
                      <div className="w-0.5 h-full bg-slate-100 mt-1 min-h-[24px]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Toyota Vios</p>
                      <p className="text-xs text-slate-500">John Doe • 10:00 AM</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Pending Returns</p>
              <div className="space-y-3">
                {[1].map((_, i) => (
                  <div key={i} className="flex gap-3 items-start group">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-orange-500 ring-4 ring-orange-50 group-hover:ring-orange-100 transition-all" />
                      <div className="w-0.5 h-full bg-slate-100 mt-1 min-h-[24px]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Honda Civic</p>
                      <p className="text-xs text-slate-500">Sarah Smith • 02:00 PM</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200">
          <h4 className="font-bold text-lg mb-2">Quick Stats</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-indigo-200 text-xs font-medium uppercase">Confirmed</p>
              <p className="text-2xl font-black">12</p>
            </div>
            <div>
              <p className="text-indigo-200 text-xs font-medium uppercase">Pending</p>
              <p className="text-2xl font-black">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* New Booking Modal */}
      <Modal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        title={selectedDate ? `New Booking for ${monthNames[month]} ${selectedDate}` : "New Booking"}
      >
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700">Select Vehicle</label>
            <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              <option>Toyota Vios (NGA 1234)</option>
              <option>Honda Civic (ABC 5678)</option>
              <option>Hiace Grandia (VAN 999)</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700">Renter Name</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Full Name" className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Start Date</label>
              <div className="relative">
                <CalendarIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="date" 
                  defaultValue={selectedDate ? `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}` : ""}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">End Date</label>
              <div className="relative">
                <CalendarIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="date" className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Pickup Time</label>
              <div className="relative">
                <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="time" className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Total Price</label>
              <input type="text" placeholder="PHP 0.00" className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm font-bold text-slate-500 cursor-not-allowed" readOnly />
            </div>
          </div>
          <div className="pt-4 flex gap-3">
            <button onClick={() => setIsBookingModalOpen(false)} className="flex-1 py-3 text-sm font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
            <button onClick={() => setIsBookingModalOpen(false)} className="flex-1 py-3 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">Confirm Booking</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
