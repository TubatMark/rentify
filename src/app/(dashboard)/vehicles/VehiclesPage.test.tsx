import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import VehiclesPage from './page';

// Mock dependencies
jest.mock('convex/react', () => ({
  useQuery: jest.fn(() => []), // Return empty array by default to simulate loaded data
}));

jest.mock('../../../../convex/_generated/api', () => ({
  api: {
    vehicles: { list: 'vehicles:list' },
  },
}));

// Mock Modal since we tested it separately, but we need it to render children for interactions
jest.mock('@/components/ui/Modal', () => {
  return ({ children, isOpen, title }: any) => {
    return isOpen ? (
      <div data-testid="mock-modal">
        <h2>{title}</h2>
        {children}
      </div>
    ) : null;
  };
});

describe('VehiclesPage - Add Unit Form', () => {
  beforeEach(() => {
    render(<VehiclesPage />);
    
    // Open the "Add New Unit" modal
    const addButton = screen.getByText(/Add New Unit/i);
    fireEvent.click(addButton);
  });

  it('contains all required input fields matching Convex schema', () => {
    // 1. Vehicle Type (type)
    expect(screen.getByText('Vehicle Type')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Car')).toBeInTheDocument(); // Default option

    // 2. Plate Number (plateNumber)
    expect(screen.getByText('Plate Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('ABC 1234')).toBeInTheDocument();

    // 3. Model Name (name/model)
    expect(screen.getByText('Model Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g. Toyota Vios 2024')).toBeInTheDocument();

    // 4. Daily Rate (pricePerDay)
    expect(screen.getByText('Daily Rate (PHP)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('1500')).toBeInTheDocument();

    // 5. Capacity (capacity - optional but present in form)
    expect(screen.getByText('Capacity')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('5')).toBeInTheDocument();
    
    // 6. Image Uploads (image)
    expect(screen.getByText('Vehicle Profile Image')).toBeInTheDocument();
    expect(screen.getByText('Showcase Gallery')).toBeInTheDocument();
  });

  it('has a save button', () => {
    expect(screen.getByText('Save Vehicle')).toBeInTheDocument();
  });
});
