import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme.js';
import CartModal from './CartModal';

const MOCK_CART_ITEMS = [
  { id: 'ws-1', title: 'דף עבודה בחשבון', price: 15, grade: 'כיתה א', subject: 'חשבון' }
];

describe('CartModal Component with MUI', () => {
  const mockClose = vi.fn();
  const mockRemove = vi.fn();
  const mockSuccess = vi.fn();

  it('renders cart items and total amount', () => {
    render(
      <ThemeProvider theme={theme}>
        <CartModal
          isOpen={true}
          onClose={mockClose}
          cartItems={MOCK_CART_ITEMS}
          onRemoveItem={mockRemove}
          onCheckoutSuccess={mockSuccess}
        />
      </ThemeProvider>
    );

    expect(screen.getByText('עגלת הקניות שלך')).toBeInTheDocument();
    expect(screen.getByText('דף עבודה בחשבון')).toBeInTheDocument();
    const priceElements = screen.getAllByText(/15/);
    expect(priceElements.length).toBeGreaterThan(0);
  });

  it('submits checkout when email is entered', () => {
    render(
      <ThemeProvider theme={theme}>
        <CartModal
          isOpen={true}
          onClose={mockClose}
          cartItems={MOCK_CART_ITEMS}
          onRemoveItem={mockRemove}
          onCheckoutSuccess={mockSuccess}
        />
      </ThemeProvider>
    );

    const emailInput = screen.getByLabelText(/כתובת אימייל/i);
    fireEvent.change(emailInput, { target: { value: 'buyer@school.edu.il' } });

    const submitBtn = screen.getByText(/אישור והורדת הדפים/i);
    fireEvent.click(submitBtn);

    expect(mockSuccess).toHaveBeenCalledWith(expect.objectContaining({
      customerEmail: 'buyer@school.edu.il'
    }));
  });
});
