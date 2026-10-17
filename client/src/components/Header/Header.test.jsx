import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme.js';
import Header from './Header';

describe('Header Component with MUI', () => {
  const mockViewChange = vi.fn();
  const mockOpenCart = vi.fn();

  it('renders brand name and navigation options', () => {
    render(
      <ThemeProvider theme={theme}>
        <Header
          currentView="store"
          onViewChange={mockViewChange}
          cartCount={3}
          onOpenCart={mockOpenCart}
        />
      </ThemeProvider>
    );

    expect(screen.getByText('EasyLearn')).toBeInTheDocument();
    expect(screen.getByText('חנות דפי העבודה')).toBeInTheDocument();
    expect(screen.getByText('האזור האישי שלי')).toBeInTheDocument();
    expect(screen.getByText('אזור ניהול (אמא)')).toBeInTheDocument();
  });

  it('triggers view change when button is clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <Header
          currentView="store"
          onViewChange={mockViewChange}
          cartCount={0}
          onOpenCart={mockOpenCart}
        />
      </ThemeProvider>
    );

    const adminBtn = screen.getByText('אזור ניהול (אמא)');
    fireEvent.click(adminBtn);

    expect(mockViewChange).toHaveBeenCalledWith('admin');
  });

  it('displays accurate cart count badge', () => {
    render(
      <ThemeProvider theme={theme}>
        <Header
          currentView="store"
          onViewChange={mockViewChange}
          cartCount={5}
          onOpenCart={mockOpenCart}
        />
      </ThemeProvider>
    );

    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
