"use client";

import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit2,
  Building,
  ShieldCheck,
  Star
} from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Account Management</p>
        <h2 className="text-3xl font-bold text-slate-900">Owner Profile</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-32 h-32 rounded-full border-4 border-slate-50 overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow-md">
                <Edit2 size={16} />
              </button>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Ricardo Gomez</h3>
            <p className="text-slate-500 font-medium">Fleet Owner</p>
            
            <div className="flex items-center gap-2 mt-4 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold">
              <ShieldCheck size={16} />
              Verified Partner
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h4 className="font-bold text-slate-900">Reputation</h4>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-sm">Owner Rating</span>
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star size={16} fill="currentColor" />
                4.9
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-sm">Response Rate</span>
              <span className="font-bold text-slate-900">98%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-sm">Member Since</span>
              <span className="font-bold text-slate-900">Jan 2024</span>
            </div>
          </div>
        </div>

        {/* Details Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Personal Information</h3>
              <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700">Edit Details</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <User size={18} className="text-slate-400" />
                  <span className="text-slate-700 font-medium">Ricardo Gomez</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <Mail size={18} className="text-slate-400" />
                  <span className="text-slate-700 font-medium">ricardo@rentify.ph</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <Phone size={18} className="text-slate-400" />
                  <span className="text-slate-700 font-medium">+63 917 123 4567</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Location</label>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <MapPin size={18} className="text-slate-400" />
                  <span className="text-slate-700 font-medium">Makati City, Metro Manila</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Business Details</h3>
              <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700">Update Info</button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <Building size={24} className="text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Gomez Fleet Rentals Co.</h4>
                  <p className="text-sm text-slate-500 mt-1">
                    Registered BIR Tax Payer • VAT Registered <br />
                    TIN: 123-456-789-000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
