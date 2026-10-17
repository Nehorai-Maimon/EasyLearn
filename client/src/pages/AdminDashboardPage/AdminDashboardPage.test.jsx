import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme.js';
import AdminDashboardPage from './AdminDashboardPage';

const MOCK_ADMIN_ITEMS = [
  {
    id: 'ws-1',
    title: 'דף עבודה בחשבון',
    grade: 'כיתה א',
    subject: 'חשבון והנדסה',
    subSubject: 'חיבור וחיסור',
    price: 15,
    downloadsCount: 42
  }
];

describe('AdminDashboardPage Component with MUI', () => {
  const mockAddWorksheet = vi.fn();
  const mockUpdatePrice = vi.fn();

  it('renders admin greeting and dashboard stats', () => {
    render(
      <ThemeProvider theme={theme}>
        <AdminDashboardPage 
          worksheets={MOCK_ADMIN_ITEMS} 
          onAddWorksheet={mockAddWorksheet} 
          onUpdatePrice={mockUpdatePrice} 
        />
      </ThemeProvider>
    );

    expect(screen.getByText(/שלום חני, ברוכה הבאה/i)).toBeInTheDocument();
    expect(screen.getByText(/הכנסות החודש/i)).toBeInTheDocument();
    expect(screen.getByText(/סה״כ הורדות/i)).toBeInTheDocument();
  });

  it('switches to upload tab when clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <AdminDashboardPage 
          worksheets={MOCK_ADMIN_ITEMS} 
          onAddWorksheet={mockAddWorksheet} 
          onUpdatePrice={mockUpdatePrice} 
        />
      </ThemeProvider>
    );

    const uploadTabBtn = screen.getByText('העלאת דף חדש (Word/PDF)');
    fireEvent.click(uploadTabBtn);

    expect(screen.getByLabelText(/שם דף העבודה \/ המארז/i)).toBeInTheDocument();
  });

  it('allows editing worksheet price', () => {
    render(
      <ThemeProvider theme={theme}>
        <AdminDashboardPage 
          worksheets={MOCK_ADMIN_ITEMS} 
          onAddWorksheet={mockAddWorksheet} 
          onUpdatePrice={mockUpdatePrice} 
        />
      </ThemeProvider>
    );

    // Switch to sheets tab
    const sheetsTabBtn = screen.getByText(/ניהול דפים ומחירים/i);
    fireEvent.click(sheetsTabBtn);

    const editPriceBtn = screen.getByText('שנה מחיר');
    fireEvent.click(editPriceBtn);

    const saveBtn = screen.getByText('שמור');
    expect(saveBtn).toBeInTheDocument();
  });
});
