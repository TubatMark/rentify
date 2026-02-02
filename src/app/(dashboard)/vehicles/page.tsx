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
  X,
  Trash2,
  Edit2
} from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Skeleton } from "@/components/ui/Skeleton";
import Modal from "@/components/ui/Modal";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import { VehicleType } from "@/types";

export default function VehiclesPage() {
  const [filter, setFilter] = useState<VehicleType | "All">("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRentModalOpen, setIsRentModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  
  // Forms state
  const [newVehicle, setNewVehicle] = useState({
    type: "Car" as VehicleType,
    plateNumber: "",
    model: "",
    pricePerDay: "",
    capacity: "",
  });

  const [editVehicleData, setEditVehicleData] = useState({
    id: "",
    type: "Car" as VehicleType,
    plateNumber: "",
    model: "",
    pricePerDay: "",
    capacity: "",
  });

  const [booking, setBooking] = useState({
    renterName: "",
    startDate: "",
    endDate: "",
    pickupTime: "",
    paymentStatus: "Paid",
  });

  // Convex Query & Mutations
  const vehicles = useQuery(api.vehicles.list);
  const addVehicle = useMutation(api.vehicles.add);
  const updateVehicle = useMutation(api.vehicles.update);
  const deleteVehicle = useMutation(api.vehicles.remove);
  const addBooking = useMutation(api.bookings.add);
  const updateVehicleStatus = useMutation(api.vehicles.updateStatus);

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

  const handleOpenEditModal = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setEditVehicleData({
      id: vehicle._id,
      type: vehicle.type,
      plateNumber: vehicle.plateNumber,
      model: vehicle.model,
      pricePerDay: vehicle.pricePerDay.toString(),
      capacity: vehicle.capacity?.toString() || "",
    });
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setIsDeleteModalOpen(true);
  };

  const handleAddVehicle = async () => {
    try {
      await addVehicle({
        name: newVehicle.model, // Using model as name for simplicity or we can add a name field
        model: newVehicle.model,
        type: newVehicle.type,
        pricePerDay: Number(newVehicle.pricePerDay),
        status: "available",
        plateNumber: newVehicle.plateNumber,
        capacity: Number(newVehicle.capacity),
        image: undefined // Placeholder for image upload logic
      });
      setIsAddModalOpen(false);
      // Reset form
      setNewVehicle({ type: "Car", plateNumber: "", model: "", pricePerDay: "", capacity: "" });
    } catch (error) {
      console.error("Failed to add vehicle:", error);
      alert("Failed to add vehicle. Please try again.");
    }
  };

  const handleEditVehicle = async () => {
    try {
      await updateVehicle({
        id: editVehicleData.id as any,
        model: editVehicleData.model,
        type: editVehicleData.type,
        pricePerDay: Number(editVehicleData.pricePerDay),
        plateNumber: editVehicleData.plateNumber,
        capacity: Number(editVehicleData.capacity),
      });
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Failed to update vehicle:", error);
      alert("Failed to update vehicle. Please try again.");
    }
  };

  const handleDeleteVehicle = async () => {
    if (!selectedVehicle) return;
    try {
      await deleteVehicle({ id: selectedVehicle._id as any });
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Failed to delete vehicle:", error);
      alert("Failed to delete vehicle. Please try again.");
    }
  };

  const handleRentVehicle = async () => {
    try {
      if (!selectedVehicle) return;

      const totalPrice = selectedVehicle.pricePerDay * 1; // Simplified calculation: 1 day default

      await addBooking({
        vehicleId: selectedVehicle._id,
        renterName: booking.renterName,
        startDate: booking.startDate,
        endDate: booking.endDate,
        status: "confirmed",
        totalPrice: totalPrice,
        pickupTime: booking.pickupTime,
        paymentStatus: booking.paymentStatus,
      });

      await updateVehicleStatus({
        id: selectedVehicle._id,
        status: "rented"
      });

      setIsRentModalOpen(false);
      // Reset form
      setBooking({ renterName: "", startDate: "", endDate: "", pickupTime: "", paymentStatus: "Paid" });
    } catch (error) {
      console.error("Failed to book vehicle:", error);
      alert("Failed to book vehicle. Please try again.");
    }
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
              {t === "Bus" ? "Bus" : t + "s"}
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
                <button 
                  onClick={() => handleOpenEditModal(vehicle)}
                  className="flex-1 py-2 text-sm font-semibold bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Edit2 size={14} />
                  Edit
                </button>
                <button 
                  onClick={() => handleOpenDeleteModal(vehicle)}
                  className="flex-1 py-2 text-sm font-semibold bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Vehicle Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Vehicle">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleAddVehicle(); }}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Vehicle Type <span className="text-rose-500">*</span></label>
              <select 
                value={newVehicle.type}
                onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value as VehicleType })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="Car">Car</option>
                <option value="Van">Van</option>
                <option value="Motorcycle">Motorcycle</option>
                <option value="Bus">Bus</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Plate Number <span className="text-rose-500">*</span></label>
              <input 
                required
                type="text" 
                placeholder="ABC 1234" 
                value={newVehicle.plateNumber}
                onChange={(e) => setNewVehicle({ ...newVehicle, plateNumber: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700">Model Name <span className="text-rose-500">*</span></label>
            <input 
              required
              type="text" 
              placeholder="e.g. Toyota Vios 2024" 
              value={newVehicle.model}
              onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Daily Rate (PHP) <span className="text-rose-500">*</span></label>
              <input 
                required
                type="number" 
                placeholder="1500" 
                value={newVehicle.pricePerDay}
                onChange={(e) => setNewVehicle({ ...newVehicle, pricePerDay: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Capacity <span className="text-rose-500">*</span></label>
              <input 
                required
                type="number" 
                placeholder="5" 
                value={newVehicle.capacity}
                onChange={(e) => setNewVehicle({ ...newVehicle, capacity: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-4 pt-2">
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Vehicle Profile Image</label>
              <div 
                onClick={() => document.getElementById('profile-image-upload')?.click()}
                className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-indigo-400 transition-colors cursor-pointer group relative overflow-hidden h-40"
              >
                <input 
                  type="file" 
                  id="profile-image-upload" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setNewVehicle({ ...newVehicle, image: url } as any);
                    }
                  }}
                />
                {(newVehicle as any).image ? (
                  <>
                    <img src={(newVehicle as any).image} alt="Profile Preview" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <p className="text-white text-xs font-bold">Click to change</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3 bg-slate-100 rounded-full mb-2 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <UploadCloud size={24} />
                    </div>
                    <p className="text-xs font-medium">Click to upload or drag and drop</p>
                    <p className="text-[10px] text-slate-400 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Showcase Gallery</label>
              <div className="grid grid-cols-4 gap-2">
                <div 
                  onClick={() => document.getElementById('gallery-image-upload')?.click()}
                  className="aspect-square border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-indigo-400 transition-colors cursor-pointer"
                >
                  <input 
                    type="file" 
                    id="gallery-image-upload" 
                    className="hidden" 
                    accept="image/*" 
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      const urls = files.map(file => URL.createObjectURL(file));
                      const currentGallery = (newVehicle as any).gallery || [];
                      setNewVehicle({ ...newVehicle, gallery: [...currentGallery, ...urls] } as any);
                    }}
                  />
                  <ImagePlus size={20} />
                  <span className="text-[10px] font-medium mt-1">Add</span>
                </div>
                {/* Uploaded Images */}
                {((newVehicle as any).gallery || []).map((url: string, i: number) => (
                  <div key={i} className="aspect-square relative rounded-xl bg-slate-100 overflow-hidden group">
                    <img 
                      src={url}
                      alt={`Showcase ${i}`} 
                      className="w-full h-full object-cover"
                    />
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent parent clicks
                        const newGallery = [...((newVehicle as any).gallery || [])];
                        newGallery.splice(i, 1);
                        setNewVehicle({ ...newVehicle, gallery: newGallery } as any);
                      }}
                      className="absolute top-1 right-1 p-1 bg-white rounded-full text-rose-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-50 z-20"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-4 flex gap-3">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 py-3 text-sm font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-3 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">Save Vehicle</button>
          </div>
        </form>
      </Modal>

      {/* Edit Vehicle Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Vehicle Details">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleEditVehicle(); }}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Vehicle Type <span className="text-rose-500">*</span></label>
              <select 
                value={editVehicleData.type}
                onChange={(e) => setEditVehicleData({ ...editVehicleData, type: e.target.value as VehicleType })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="Car">Car</option>
                <option value="Van">Van</option>
                <option value="Motorcycle">Motorcycle</option>
                <option value="Bus">Bus</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Plate Number <span className="text-rose-500">*</span></label>
              <input 
                required
                type="text" 
                value={editVehicleData.plateNumber}
                onChange={(e) => setEditVehicleData({ ...editVehicleData, plateNumber: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700">Model Name <span className="text-rose-500">*</span></label>
            <input 
              required
              type="text" 
              value={editVehicleData.model}
              onChange={(e) => setEditVehicleData({ ...editVehicleData, model: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Daily Rate (PHP) <span className="text-rose-500">*</span></label>
              <input 
                required
                type="number" 
                value={editVehicleData.pricePerDay}
                onChange={(e) => setEditVehicleData({ ...editVehicleData, pricePerDay: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Capacity <span className="text-rose-500">*</span></label>
              <input 
                required
                type="number" 
                value={editVehicleData.capacity}
                onChange={(e) => setEditVehicleData({ ...editVehicleData, capacity: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>
          </div>
          <div className="pt-4 flex gap-3">
            <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 py-3 text-sm font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-3 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">Update Vehicle</button>
          </div>
        </form>
      </Modal>

      {/* Rent Vehicle Modal */}
      <Modal isOpen={isRentModalOpen} onClose={() => setIsRentModalOpen(false)} title={`Rent ${selectedVehicle?.name || 'Vehicle'}`}>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleRentVehicle(); }}>
          <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 mb-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-indigo-600 font-medium">Daily Rate</span>
              <span className="text-indigo-700 font-bold">₱{selectedVehicle?.pricePerDay.toLocaleString()}</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700">Renter Name <span className="text-rose-500">*</span></label>
            <input 
              required
              type="text" 
              placeholder="Full Name" 
              value={booking.renterName}
              onChange={(e) => setBooking({ ...booking, renterName: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Start Date <span className="text-rose-500">*</span></label>
              <input 
                required
                type="date" 
                value={booking.startDate}
                onChange={(e) => setBooking({ ...booking, startDate: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">End Date <span className="text-rose-500">*</span></label>
              <input 
                required
                type="date" 
                value={booking.endDate}
                onChange={(e) => setBooking({ ...booking, endDate: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700">Payment Status <span className="text-rose-500">*</span></label>
            <select 
              value={booking.paymentStatus}
              onChange={(e) => setBooking({ ...booking, paymentStatus: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Partial Deposit">Partial Deposit</option>
            </select>
          </div>
          <div className="pt-4 flex gap-3">
            <button type="button" onClick={() => setIsRentModalOpen(false)} className="flex-1 py-3 text-sm font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-3 text-sm font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all">Confirm Rental</button>
          </div>
        </form>
      </Modal>
      {/* Confirmation Modal for Delete */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteVehicle}
        title="Delete Vehicle"
        message={`Are you sure you want to delete ${selectedVehicle?.name}? This action cannot be undone and will remove the vehicle from your fleet permanently.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        isDestructive={true}
      />
    </div>
  );
}
