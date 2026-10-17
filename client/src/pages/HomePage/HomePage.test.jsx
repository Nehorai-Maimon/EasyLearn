import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme.js';
import HomePage from './HomePage';

const MOCK_ITEMS = [
  {
    id: 'ws-sci-1',
    title: 'מערכת העיכול בגוף האדם',
    description: 'מבנה מערכת העיכול',
    grade: 'כיתה ה',
    subject: 'מדעים',
    subSubject: 'גוף האדם ובריאות',
    price: 15,
    previewUrl: 'https://example.com/sheet1.jpg',
    hasAnswerKey: true
  },
  {
    id: 'ws-2',
    title: 'דף תרגול בלשון',
    description: 'זיהוי אותיות',
    grade: 'גן',
    subject: 'עברית ולשון',
    subSubject: 'מוכנות לקריאה',
    price: 10,
    previewUrl: 'https://example.com/sheet2.jpg',
    hasAnswerKey: false
  }
];

describe('HomePage Component with MUI', () => {
  const mockAddToCart = vi.fn();
  const mockPreview = vi.fn();

  it('renders catalog items and hero section', () => {
    render(
      <ThemeProvider theme={theme}>
        <HomePage 
          worksheets={MOCK_ITEMS} 
          onAddToCart={mockAddToCart} 
          onPreview={mockPreview} 
        />
      </ThemeProvider>
    );

    expect(screen.getByText('מערכת העיכול בגוף האדם')).toBeInTheDocument();
    expect(screen.getByText('דף תרגול בלשון')).toBeInTheDocument();
  });

  it('filters worksheets by search input', () => {
    render(
      <ThemeProvider theme={theme}>
        <HomePage 
          worksheets={MOCK_ITEMS} 
          onAddToCart={mockAddToCart} 
          onPreview={mockPreview} 
        />
      </ThemeProvider>
    );

    const searchInput = screen.getByPlaceholderText(/חיפוש לפי נושא/i);
    fireEvent.change(searchInput, { target: { value: 'עיכול' } });

    expect(screen.getByText('מערכת העיכול בגוף האדם')).toBeInTheDocument();
    expect(screen.queryByText('דף תרגול בלשון')).not.toBeInTheDocument();
  });

  it('calls onAddToCart when clicking add to cart button', () => {
    render(
      <ThemeProvider theme={theme}>
        <HomePage 
          worksheets={MOCK_ITEMS} 
          onAddToCart={mockAddToCart} 
          onPreview={mockPreview} 
        />
      </ThemeProvider>
    );

    const addButtons = screen.getAllByText('הוספה לסל');
    fireEvent.click(addButtons[0]);

    expect(mockAddToCart).toHaveBeenCalledWith(MOCK_ITEMS[0]);
  });
});
