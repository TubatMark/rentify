"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  MapPin,
  Users,
  Wrench,
  Clock,
  ShieldCheck,
  Car,
  UploadCloud,
  ImagePlus,
  X
} from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Skeleton } from "@/components/ui/Skeleton";
import Modal from "@/components/ui/Modal";
import { VehicleType } from "@/types";

export default function VehiclesPage() {
  const [filter, setFilter] = useState<VehicleType | "All">("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRentModalOpen, setIsRentModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  // Convex Query
  const vehicles = useQuery(api.vehicles.list);

  const filteredVehicles = vehicles 
    ? (filter === "All" ? vehicles : vehicles.filter((v: any) => v.type === filter))
    : [];

  const statusColors: Record<string, string> = {
    available: "bg-emerald-50 text-emerald-700 border-emerald-100",
    rented: "bg-amber-50 text-amber-700 border-amber-100",
    maintenance: "bg-rose-50 text-rose-700 border-rose-100",
  };

  const handleOpenRentModal = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setIsRentModalOpen(true);
  };

  if (vehicles === undefined) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-48" />
          </div>
          <Skeleton className="h-12 w-40 rounded-xl" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-12 w-full flex-1 rounded-xl" />
          <div className="flex gap-2">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-20 rounded-full" />)}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-[300px] w-full rounded-2xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Asset Management</p>
          <h2 className="text-3xl font-bold text-slate-900">Rental Units</h2>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
        >
          <Plus size={20} />
          Add New Unit
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, model, or plate number..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {["All", "Car", "Van", "Motorcycle", "Bus"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t as any)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                filter === t 
                ? "bg-slate-900 text-white shadow-md" 
                : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
              }`}
            >
              {t}s
            </button>
          ))}
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle: any) => (
          <div key={vehicle._id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="relative aspect-video bg-slate-100">
              <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                <Car size={48} />
              </div>
              <div className="absolute top-3 left-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1 backdrop-blur-md ${statusColors[vehicle.status]}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    vehicle.status === 'available' ? 'bg-emerald-500' : 
                    vehicle.status === 'rented' ? 'bg-amber-500' : 'bg-rose-500'
                  }`} />
                  {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                </span>
              </div>
              <button className="absolute top-3 right-3 p-1.5 bg-white/80 hover:bg-white rounded-lg text-slate-600 transition-colors shadow-sm">
                <MoreVertical size={18} />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">{vehicle.name}</h3>
                <p className="text-sm text-slate-500">{vehicle.model}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100">
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock size={16} className="text-slate-400" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Daily Rate</span>
                    <span className="text-sm font-bold">₱{vehicle.pricePerDay.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <ShieldCheck size={16} className="text-slate-400" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Plate Number</span>
                    <span className="text-sm font-bold">{vehicle.plateNumber}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-2 text-sm font-semibold bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                  Edit Details
                </button>
                {vehicle.status === 'available' ? (
                  <button 
                    onClick={() => handleOpenRentModal(vehicle)}
                    className="flex-1 py-2 text-sm font-bold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-all active:scale-95"
                  >
                    Rent Now
                  </button>
                ) : (
                  <button className="flex-1 py-2 text-sm font-semibold bg-slate-100 text-slate-400 rounded-lg cursor-not-allowed">
                    Unavailable
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Vehicle Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Vehicle">
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Vehicle Type</label>
              <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                <option>Car</option>
                <option>Van</option>
                <option>Motorcycle</option>
                <option>Bus</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Plate Number</label>
              <input type="text" placeholder="ABC 1234" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700">Model Name</label>
            <input type="text" placeholder="e.g. Toyota Vios 2024" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Daily Rate (PHP)</label>
              <input type="number" placeholder="1500" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Capacity</label>
              <input type="number" placeholder="5" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-4 pt-2">
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Vehicle Profile Image</label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-indigo-400 transition-colors cursor-pointer group">
                <div className="p-3 bg-slate-100 rounded-full mb-2 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  <UploadCloud size={24} />
                </div>
                <p className="text-xs font-medium">Click to upload or drag and drop</p>
                <p className="text-[10px] text-slate-400 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Showcase Gallery</label>
              <div className="grid grid-cols-4 gap-2">
                <div className="aspect-square border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-indigo-400 transition-colors cursor-pointer">
                  <ImagePlus size={20} />
                  <span className="text-[10px] font-medium mt-1">Add</span>
                </div>
                {/* Mock Uploaded Images */}
                {[1, 2].map((i) => (
                  <div key={i} className="aspect-square relative rounded-xl bg-slate-100 overflow-hidden group">
                    <img 
                      src={`https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=150&q=80`} 
                      alt="Showcase" 
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute top-1 right-1 p-1 bg-white/80 rounded-full text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-4 flex gap-3">
            <button onClick={() => setIsAddModalOpen(false)} className="flex-1 py-3 text-sm font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
            <button onClick={() => setIsAddModalOpen(false)} className="flex-1 py-3 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">Save Vehicle</button>
          </div>
        </form>
      </Modal>

      {/* Rent Vehicle Modal */}
      <Modal isOpen={isRentModalOpen} onClose={() => setIsRentModalOpen(false)} title={`Rent ${selectedVehicle?.name || 'Vehicle'}`}>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 mb-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-indigo-600 font-medium">Daily Rate</span>
              <span className="text-indigo-700 font-bold">₱{selectedVehicle?.pricePerDay.toLocaleString()}</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700">Renter Name</label>
            <input type="text" placeholder="Full Name" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Start Date</label>
              <input type="date" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">End Date</label>
              <input type="date" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700">Payment Status</label>
            <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              <option>Paid</option>
              <option>Pending</option>
              <option>Partial Deposit</option>
            </select>
          </div>
          <div className="pt-4 flex gap-3">
            <button onClick={() => setIsRentModalOpen(false)} className="flex-1 py-3 text-sm font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
            <button onClick={() => setIsRentModalOpen(false)} className="flex-1 py-3 text-sm font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all">Confirm Rental</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
