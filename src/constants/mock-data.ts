import { Vehicle, Activity } from '../types';

export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: '1',
    name: 'Toyota Vios',
    model: '2023 G AT',
    type: 'Car',
    pricePerDay: 1500,
    status: 'available',
    plateNumber: 'NGA 1234',
    capacity: 5,
  },
  {
    id: '2',
    name: 'Honda Click 125i',
    model: '2024',
    type: 'Motorcycle',
    pricePerDay: 500,
    status: 'rented',
    plateNumber: '123 ABC',
  },
  {
    id: '3',
    name: 'Toyota Hiace Grandia',
    model: '2022 GL',
    type: 'Van',
    pricePerDay: 3500,
    status: 'available',
    plateNumber: 'ABC 5678',
    capacity: 12,
  },
  {
    id: '4',
    name: 'Hino 300',
    model: '2021',
    type: 'Bus',
    pricePerDay: 8000,
    status: 'maintenance',
    plateNumber: 'BUS 999',
    capacity: 30,
  }
];

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'a1',
    type: 'rental_start',
    vehicleId: '2',
    vehicleName: 'Honda Click 125i',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    description: 'Rental started by John Doe',
  },
  {
    id: 'a2',
    type: 'rental_end',
    vehicleId: '1',
    vehicleName: 'Toyota Vios',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    description: 'Rental completed, vehicle returned in good condition',
  }
];
