export type VehicleType = 'Van' | 'Car' | 'Motorcycle' | 'Bus' | 'Other';

export type VehicleStatus = 'available' | 'rented' | 'maintenance';

export interface Vehicle {
  id: string;
  name: string;
  model: string;
  type: VehicleType;
  pricePerDay: number;
  status: VehicleStatus;
  image?: string;
  capacity?: number;
  plateNumber: string;
  lastMaintenance?: string;
}

export interface Activity {
  id: string;
  type: 'rental_start' | 'rental_end' | 'update' | 'maintenance_flag';
  vehicleId: string;
  vehicleName: string;
  timestamp: string;
  description: string;
}

export interface DashboardStats {
  totalUnits: number;
  activeRentals: number;
  availableUnits: number;
  totalEarningsPHP: number;
}
