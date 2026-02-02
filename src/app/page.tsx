"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Navigation, 
  MapPin, 
  CreditCard, 
  LineChart, 
  Upload, 
  ShieldCheck, 
  Wallet,
  ArrowRight,
  Check,
  Car
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-white overflow-x-hidden font-sans">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-lg shadow-indigo-200">
              <Car size={20} />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">Rentify</h2>
          </div>
          <nav className="hidden md:flex flex-1 justify-center gap-8">
            <a className="text-sm font-semibold text-indigo-600 border-b-2 border-indigo-600 pb-1" href="#">For Owners</a>
            <a className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors" href="#">For Renters</a>
            <a className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors" href="#">Enterprise</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-bold text-slate-700 hover:text-indigo-600 hidden sm:block">Login</Link>
            <Link 
              href="/register"
              className="flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-100 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-slate-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse gap-12 lg:flex-row lg:items-center">
            {/* Content */}
            <div className="flex flex-1 flex-col gap-6 text-left lg:max-w-xl">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/50 px-4 py-1.5 text-xs font-bold text-indigo-600"
              >
                <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
                New: Managed Fleet Maintenance
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl font-black leading-[1.1] tracking-tight text-slate-900 sm:text-6xl"
              >
                Monetize Your Fleet with <span className="text-indigo-600">Rentify</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg font-medium leading-relaxed text-slate-500"
              >
                Turn your idle vehicles into income generators with the Philippines' most trusted rental platform. Simple, secure, and profitable.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <Link
                  href="/register"
                  className="flex items-center justify-center rounded-xl bg-indigo-600 h-14 px-8 text-lg font-bold text-white shadow-xl shadow-indigo-100 transition-all hover:bg-indigo-700 hover:-translate-y-1 active:translate-y-0"
                >
                  List Your Asset
                </Link>
                <button
                  className="flex items-center justify-center rounded-xl bg-white border border-slate-200 h-14 px-8 text-lg font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300"
                >
                  Learn More
                </button>
              </motion.div>
              <div className="flex items-center gap-4 pt-6 text-sm text-slate-500">
                <div className="flex -space-x-2">
                  {[
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuAehq8YFQJvKvdkS1vXOJHdtQ5hYzopCG2s6zVx5uzwpnhH6mFbx2BZYR3BV5Vmw08aducFpuRPJ2OOqkcr0E62QvavreZTCyDaYK8cm81sTYJtPUSISRN3bTA0g90zqzN1RYlO93aLENvaz8biOkxWer9trQk8YxUD-zYC0EQssCv68eff4ojuwR23R80omCUjIilom6YuWu3177yW_5z8BiGglKfDWDaoNYc7B7UdoB053raV34RWM0SHLs_-0WaeYePeQGJI-G4",
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuC1MwRpMcXe2dYmmJaOIa6GJ0E1ypluAbevQMVPXw89yci7tAHq9FDAALT-EXMjbeUkPTA7RTuQFDfzt3ozON_G0tExZS7jsWiZsZV8gTmW7o-nTn4JLDfSGEbITLVZDgTEZdHfhhnTNwDaLKhpZNDOGT-GgRPwsbO9ZRrd2hnY8bOFWjegBQliqGEXQhbZx-C084v927SmV2-RmmRGmO9OdwWbdCHv8GTa3QMqKLQNDDkUazU-p_1nnJ7LxK39DpVM2V3RlXsbV6A",
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuD68VMJtIUTCEI3AhEb2RGAhQBwIio-4Ul4kO8EfZBrdaJ3r-0tdZX5OxU2AapnloVPbq4leJnGvCaWGZVxVFDS5049sj2xaF3gW3pXPMLGGuIevwgSns8qWZKCrM1guexp1YndZpXeKKxcAH0-wAX53-n0m1Nnknt-ZxVvxTeub8y8RAqXO2etTfCqtIcXmjult-MWcxD7_49u7BkQbL7hdGts6AyHMJdkgZAYSkB0fXJzoBibrow7GPZ4EcprKdXZmaddsDXbtmY"
                  ].map((url, i) => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-200 bg-cover shadow-sm" style={{ backgroundImage: `url(${url})` }} />
                  ))}
                </div>
                <span className="font-semibold text-slate-600">Joined by 500+ owners this month</span>
              </div>
            </div>
            {/* Image Placeholder */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="flex flex-1 items-center justify-center"
            >
              <div className="relative w-full aspect-[4/3] lg:aspect-square max-w-[600px] overflow-hidden rounded-3xl bg-slate-100 shadow-2xl">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBAxmYGTd7ZKdFfGD1W13OyRVI6Y5PMW6H7Ef9GCMD3EvHol2boSYpevC7DXVR21vaPB4kCcjkFhvfLey__spXzqU897Ah_cvr-yD0FtAbPs4UtRJ9dB6Hzcjw6te-YL6mvBYNdmYlhYouQFLbrwerbtpefs5eVRQusaKcD2nuoc9MrRJaX2YkUpRkrj6nYg_Yzz8zpOgmKfWYk69piYs8hAToTPGCbNR-paYCNH4Yxid2EUmEFFwsszpIo3ZXaxkqevu0MKhAG0Gk')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { label: "Active Owners", value: "1,200+", color: "text-slate-900" },
              { label: "Total Payouts", value: "₱25M+", color: "text-indigo-600" },
              { label: "Cities Covered", value: "35+", color: "text-slate-900" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-slate-50/50 p-8 text-center transition-all hover:bg-slate-50 hover:shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <p className={`text-4xl font-black ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Why Choose Rentify?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-500 font-medium">
              We provide the comprehensive tools you need to manage your fleet effortlessly and maximize your ROI.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { title: "Automated Tracking", desc: "Real-time GPS integration ensures you always know where your vehicles are, 24/7.", icon: MapPin, bg: "bg-blue-50 text-blue-600" },
              { title: "Secure Payments in ₱", desc: "Guaranteed payouts in PHP directly to your local bank account every week.", icon: CreditCard, bg: "bg-orange-50 text-orange-600" },
              { title: "Performance Analytics", desc: "Comprehensive dashboard for tracking fleet utilization and earnings growth.", icon: LineChart, bg: "bg-indigo-50 text-indigo-600" }
            ].map((feature, i) => (
              <div key={i} className="group flex flex-col gap-6 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-50/50">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.bg} transition-all group-hover:scale-110 group-hover:rotate-3`}>
                  <feature.icon size={28} />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative bg-indigo-600 rounded-[3rem] p-12 lg:p-20 text-center text-white overflow-hidden shadow-2xl shadow-indigo-200">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl mb-6">Ready to maximize your assets?</h2>
            <p className="mb-10 text-xl text-indigo-100 font-medium opacity-90">Join thousands of smart vehicle owners earning passive income today.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/register"
                className="rounded-2xl bg-white px-10 py-4 text-lg font-bold text-indigo-600 shadow-xl transition-all hover:scale-105 hover:bg-indigo-50 active:scale-95"
              >
                Start Earning Now
              </Link>
              <button
                className="rounded-2xl border-2 border-white/30 bg-indigo-500/50 backdrop-blur-md px-10 py-4 text-lg font-bold text-white transition-all hover:bg-white/10 active:scale-95"
              >
                Calculate ROI
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 pt-16 pb-8 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2 lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-lg">
                  <Car size={18} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Rentify</h3>
              </div>
              <p className="max-w-xs text-slate-500 font-medium leading-relaxed">
                The smartest way to rent and earn. We connect vehicle owners with reliable renters across the Philippines.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Platform</h4>
              <a className="text-sm text-slate-500 font-medium hover:text-indigo-600 transition-colors" href="#">Browse Cars</a>
              <a className="text-sm text-slate-500 font-medium hover:text-indigo-600 transition-colors" href="#">How it Works</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Company</h4>
              <a className="text-sm text-slate-500 font-medium hover:text-indigo-600 transition-colors" href="#">About Us</a>
              <a className="text-sm text-slate-500 font-medium hover:text-indigo-600 transition-colors" href="#">Contact</a>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-400 text-sm font-medium">
            <p>© 2026 Rentify Philippines. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
