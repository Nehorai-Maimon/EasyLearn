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
    downloadsCount: 42,
    status: 'ACTIVE'
  },
  {
    id: 'ws-2',
    title: 'מערכת העיכול במדעים',
    grade: 'כיתה ה',
    subject: 'מדעים',
    subSubject: 'גוף האדם ובריאות',
    price: 18,
    downloadsCount: 88,
    status: 'ACTIVE'
  }
];

const MOCK_CATEGORIES = [
  {
    id: 'cat-sci',
    name: 'מדעים',
    icon: '🔬',
    subtopics: ['גוף האדם ובריאות', 'צמחים']
  },
  {
    id: 'cat-math',
    name: 'חשבון והנדסה',
    icon: '📐',
    subtopics: ['חיבור וחיסור', 'שברים']
  }
];

describe('AdminDashboardPage Component with MUI', () => {
  const mockAddWorksheet = vi.fn();
  const mockUpdatePrice = vi.fn();
  const mockReorderWorksheets = vi.fn();
  const mockAddCategory = vi.fn();

  it('renders admin greeting and dashboard stats', () => {
    render(
      <ThemeProvider theme={theme}>
        <AdminDashboardPage 
          worksheets={MOCK_ADMIN_ITEMS}
          categories={MOCK_CATEGORIES}
          onAddWorksheet={mockAddWorksheet} 
          onUpdatePrice={mockUpdatePrice} 
        />
      </ThemeProvider>
    );

    expect(screen.getByText(/שלום חני, ברוכה הבאה/i)).toBeInTheDocument();
    expect(screen.getByText(/הכנסות החודש/i)).toBeInTheDocument();
    expect(screen.getByText(/סה״כ הורדות/i)).toBeInTheDocument();
  });

  it('renders storefront live mirror with order indicators and sheets', () => {
    render(
      <ThemeProvider theme={theme}>
        <AdminDashboardPage 
          worksheets={MOCK_ADMIN_ITEMS}
          categories={MOCK_CATEGORIES}
          onAddWorksheet={mockAddWorksheet} 
          onUpdatePrice={mockUpdatePrice}
          onReorderWorksheets={mockReorderWorksheets}
        />
      </ThemeProvider>
    );

    expect(screen.getByText(/שיקוף חי של חנות הלקוחות/i)).toBeInTheDocument();
    expect(screen.getByText('דף עבודה בחשבון')).toBeInTheDocument();
    expect(screen.getByText('מערכת העיכול במדעים')).toBeInTheDocument();
    expect(screen.getByText('מיקום #1')).toBeInTheDocument();
    expect(screen.getByText('מיקום #2')).toBeInTheDocument();
  });

  it('switches to categories tab and renders category management', () => {
    render(
      <ThemeProvider theme={theme}>
        <AdminDashboardPage 
          worksheets={MOCK_ADMIN_ITEMS}
          categories={MOCK_CATEGORIES}
          onAddWorksheet={mockAddWorksheet} 
          onUpdatePrice={mockUpdatePrice}
          onAddCategory={mockAddCategory}
        />
      </ThemeProvider>
    );

    const catTabBtn = screen.getByText(/ניהול קטגוריות ותתי-נושאים/i);
    fireEvent.click(catTabBtn);

    expect(screen.getByText(/הוספת מקצוע \/ קטגוריה חדשה/i)).toBeInTheDocument();
    expect(screen.getByText('גוף האדם ובריאות')).toBeInTheDocument();
    expect(screen.getByText('חיבור וחיסור')).toBeInTheDocument();
  });

  it('switches to upload tab when clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <AdminDashboardPage 
          worksheets={MOCK_ADMIN_ITEMS}
          categories={MOCK_CATEGORIES}
          onAddWorksheet={mockAddWorksheet} 
          onUpdatePrice={mockUpdatePrice} 
        />
      </ThemeProvider>
    );

    const uploadTabBtn = screen.getByText('העלאת דף חדש (Word/PDF)');
    fireEvent.click(uploadTabBtn);

    expect(screen.getByLabelText(/שם דף העבודה \/ המארז/i)).toBeInTheDocument();
  });

  it('allows editing worksheet price in the table view', () => {
    render(
      <ThemeProvider theme={theme}>
        <AdminDashboardPage 
          worksheets={MOCK_ADMIN_ITEMS}
          categories={MOCK_CATEGORIES}
          onAddWorksheet={mockAddWorksheet} 
          onUpdatePrice={mockUpdatePrice} 
        />
      </ThemeProvider>
    );

    // Switch to sheets tab
    const sheetsTabBtn = screen.getByText(/ניהול דפים ומחירים/i);
    fireEvent.click(sheetsTabBtn);

    const editPriceBtns = screen.getAllByText('שנה מחיר');
    fireEvent.click(editPriceBtns[0]);

    const saveBtn = screen.getByText('שמור');
    expect(saveBtn).toBeInTheDocument();
  });
});
