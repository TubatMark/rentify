"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Car, Mail, Lock, ArrowRight, User, Building, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Alert from "@/components/ui/Alert";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ isVisible: boolean; type: "success" | "error"; message: string }>({ isVisible: false, type: "success", message: "" });
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    businessName: "",
    email: "",
    password: "",
  });

  const registerUser = useMutation(api.users.register);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real app, you would handle auth provider registration here (e.g., Clerk, Firebase)
      // For now, we save the user data to our Convex DB
      await registerUser({
        name: formData.fullName,
        email: formData.email,
        role: "owner",
        image: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.fullName)}&background=random`,
      });

      setAlert({ isVisible: true, type: "success", message: "Registration Successful! Redirecting to login..." });
      
      // Redirect to login on success
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (error) {
      console.error("Registration failed:", error);
      setAlert({ isVisible: true, type: "error", message: "Registration failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <Alert 
        isVisible={alert.isVisible} 
        type={alert.type} 
        message={alert.message} 
        onClose={() => setAlert({ ...alert, isVisible: false })} 
      />
      {/* Left Side: Visuals */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-slate-900 relative overflow-hidden text-white">
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600">
              <Car size={24} />
            </div>
            <span className="text-2xl font-black tracking-tight">Rentify</span>
          </Link>
        </div>

        <div className="relative z-10 space-y-6">
          <h1 className="text-5xl font-black leading-tight">
            Scale your <br />
            <span className="text-indigo-500">Rental Business</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-md">
            Join 500+ owners across the Philippines earning passive income through their fleet.
          </p>

          <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6 max-w-sm mt-12">
            <p className="text-slate-300 italic">"Rentify helped me turn my two idle cars into a 5-car fleet in just 6 months. The management tools are a lifesaver!"</p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-10 h-10 rounded-full bg-slate-600" />
              <div>
                <p className="font-bold text-sm">Ricardo Gomez</p>
                <p className="text-xs text-slate-500">Fleet Owner, Manila</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-slate-500 text-sm">
          Strictly for fleet owners and business admins.
        </div>

        {/* Abstract visuals */}
        <div className="absolute -right-24 top-1/4 w-96 h-96 border-8 border-indigo-500/10 rounded-full" />
        <div className="absolute -left-12 bottom-1/4 w-64 h-64 border-8 border-slate-700/20 rounded-full" />
      </div>

      {/* Right Side: Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:px-12 bg-white overflow-y-auto">
        <div className="w-full max-w-md space-y-8 py-12">
          <div className="space-y-2">
             <h2 className="text-3xl font-bold text-slate-900">Partner with Us</h2>
            <p className="text-slate-500">Complete the form to start listing your assets</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    required 
                    type="text" 
                    name="fullName"
                    placeholder="John Doe" 
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm" 
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    required 
                    type="tel" 
                    name="phone"
                    placeholder="0917..." 
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm" 
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Business Name (Optional)</label>
              <div className="relative">
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  name="businessName"
                  placeholder="e.g. Manila Rental Co." 
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm" 
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  required 
                  type="email" 
                  name="email"
                  placeholder="name@business.com" 
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm" 
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Set Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  required 
                  type="password" 
                  name="password"
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm" 
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex items-start gap-3 px-1 pt-2">
              <input required type="checkbox" className="mt-1 w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500" />
              <p className="text-xs text-slate-500 leading-normal">
                I agree to the <Link href="#" className="font-bold text-indigo-600 underline">Terms of Service</Link> and <Link href="#" className="font-bold text-indigo-600 underline">Privacy Policy</Link> for business owners.
              </p>
            </div>

            <button 
              disabled={isLoading}
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 mt-4"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Register as Owner
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-slate-500 text-sm font-medium">
              Already a partner?{" "}
              <Link href="/login" className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
