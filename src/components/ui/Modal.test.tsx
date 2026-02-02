import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Modal from './Modal';

// Mock Framer Motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, onClick, className, ...props }: any) => (
      <div className={className} onClick={onClick} {...props}>
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock Lucide Icon
jest.mock('lucide-react', () => ({
  X: () => <span data-testid="close-icon">X</span>,
}));

describe('Modal Component', () => {
  const mockOnClose = jest.fn();
  const title = 'Test Modal';
  const content = 'Modal Content';

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders nothing when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose} title={title}>
        <div>{content}</div>
      </Modal>
    );
    
    expect(screen.queryByText(title)).not.toBeInTheDocument();
    expect(screen.queryByText(content)).not.toBeInTheDocument();
  });

  it('renders content when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title={title}>
        <div>{content}</div>
      </Modal>
    );
    
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title={title}>
        <div>{content}</div>
      </Modal>
    );
    
    const closeButton = screen.getByTestId('close-icon').closest('button');
    fireEvent.click(closeButton!);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
