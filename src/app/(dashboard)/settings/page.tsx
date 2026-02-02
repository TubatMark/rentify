import { User, Building, CreditCard, Bell, Shield } from "lucide-react";

export default function SettingsPage() {
  const sections = [
    { title: "Personal Profile", desc: "Manage your account details and login credentials", icon: User },
    { title: "Business Info", desc: "Update your business name, address, and contact info", icon: Building },
    { title: "Payment Preferences", desc: "Configure how you receive payouts in PHP", icon: CreditCard },
    { title: "Notifications", desc: "Choose what alerts you receive for rentals and maintenance", icon: Bell },
    { title: "Security", desc: "Password management and two-factor authentication", icon: Shield },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Configuration</p>
        <h2 className="text-3xl font-bold text-slate-900">Settings</h2>
      </div>

      <div className="max-w-3xl space-y-4">
        {sections.map((section) => (
          <button 
            key={section.title}
            className="w-full flex items-center gap-6 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all text-left group"
          >
            <div className="p-3 bg-slate-50 rounded-xl text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
              <section.icon size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900">{section.title}</h3>
              <p className="text-sm text-slate-500 mt-0.5">{section.desc}</p>
            </div>
            <div className="w-8 h-8 flex items-center justify-center text-slate-300 group-hover:text-indigo-400 transition-colors">
              <span className="text-2xl">›</span>
            </div>
          </button>
        ))}
      </div>

      <div className="p-8 bg-indigo-600 rounded-3xl text-white overflow-hidden relative shadow-xl shadow-indigo-100">
        <div className="relative z-10 max-w-lg">
          <h3 className="text-2xl font-bold mb-2">Need help with your fleet?</h3>
          <p className="text-indigo-100 mb-6">Our dedicated account managers are available 24/7 to help you optimize your rental operations.</p>
          <button className="px-6 py-2 bg-white text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition-colors shadow-lg">
            Contact Support
          </button>
        </div>
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
