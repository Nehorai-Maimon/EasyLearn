import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme.js';
import CustomerDashboardPage from './CustomerDashboardPage';

const MOCK_LIBRARY = [
  {
    worksheetId: 'ws-101',
    title: 'מארז חגי תשרי המלא',
    purchaseDate: '2026-10-15T09:30:00.000Z',
    orderNumber: 'EL-101'
  }
];

describe('CustomerDashboardPage Component with MUI', () => {
  it('renders customer library items', () => {
    render(
      <ThemeProvider theme={theme}>
        <CustomerDashboardPage 
          libraryItems={MOCK_LIBRARY} 
          customerEmail="test@school.edu.il" 
        />
      </ThemeProvider>
    );

    expect(screen.getByText('האזור האישי שלי 🎓')).toBeInTheDocument();
    expect(screen.getByText('מארז חגי תשרי המלא')).toBeInTheDocument();
    expect(screen.getByText(/הזמנה #EL-101/i)).toBeInTheDocument();
  });

  it('shows empty state when no items in library', () => {
    render(
      <ThemeProvider theme={theme}>
        <CustomerDashboardPage 
          libraryItems={[]} 
          customerEmail="test@school.edu.il" 
        />
      </ThemeProvider>
    );

    expect(screen.getByText('אין עדיין דפי עבודה בספרייה שלך')).toBeInTheDocument();
  });

  it('triggers download notice alert upon click', () => {
    render(
      <ThemeProvider theme={theme}>
        <CustomerDashboardPage 
          libraryItems={MOCK_LIBRARY} 
          customerEmail="test@school.edu.il" 
        />
      </ThemeProvider>
    );

    const downloadBtn = screen.getByText('הורד דף עבודה (PDF)');
    fireEvent.click(downloadBtn);

    expect(screen.getByText(/הקובץ נחתם דיגיטלית/i)).toBeInTheDocument();
  });
});
