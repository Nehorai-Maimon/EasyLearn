import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import CustomerDashboardPage from './pages/CustomerDashboardPage/CustomerDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage/AdminDashboardPage';
import CartModal from './components/CartModal/CartModal';
import WorksheetPreviewModal from './components/WorksheetPreviewModal/WorksheetPreviewModal';
import { getWorksheets, getCustomerLibrary, submitOrder, createWorksheet, updateWorksheet } from './services/api';

/**
 * Root Application Component with Material-UI
 * Coordinates state between Storefront, Customer Library, and Mother's Admin Portal
 */
export default function App() {
  const [currentView, setCurrentView] = useState('store'); // 'store' | 'customer' | 'admin'
  const [worksheets, setWorksheets] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [previewSheet, setPreviewSheet] = useState(null);
  const [customerLibrary, setCustomerLibrary] = useState([]);
  const [customerEmail, setCustomerEmail] = useState('teacher@school.edu.il');

  // Load worksheets and customer library on mount
  useEffect(() => {
    async function loadData() {
      const sheets = await getWorksheets();
      if (sheets && sheets.length > 0) {
        setWorksheets(sheets);
      } else {
        // Fallback default initial seed featuring Science
        setWorksheets([
          {
            id: 'ws-sci-1',
            title: 'מערכת העיכול בגוף האדם: מסלול המזון ותפקידי האיברים',
            description: 'דף תרגול מדורג עם איור מפורט, שאלות הבנה על תחנות המזון מן הפה ועד הספיגה בדם, ושאלות חשיבה.',
            grade: 'כיתה ה',
            subject: 'מדעים',
            subSubject: 'גוף האדם ובריאות',
            price: 15,
            originalPrice: 20,
            previewUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
            hasAnswerKey: true,
            isBundle: false,
            pageCount: 4,
            downloadsCount: 189,
            viewsCount: 940
          },
          {
            id: 'ws-sci-2',
            title: 'מחלקות בעלי החיים: יונקים, עופות, זוחלים, דו-חיים ודגים',
            description: 'טבלת השוואה מקיפה בין מחלקות בעלי החיים: כיסוי גוף, נשימה, רבייה ודוגמאות מהטבע הישראלי.',
            grade: 'כיתה ד',
            subject: 'מדעים',
            subSubject: 'בעלי חיים ומערכות אקולוגיות',
            price: 14,
            originalPrice: null,
            previewUrl: 'https://images.unsplash.com/photo-1474511320723-9a56873ee67b?auto=format&fit=crop&w=600&q=80',
            hasAnswerKey: true,
            isBundle: false,
            pageCount: 3,
            downloadsCount: 165,
            viewsCount: 780
          },
          {
            id: 'ws-sci-3',
            title: 'תהליך הפוטוסינתזה וחלקי הצמח',
            description: 'כיצד הצמח מייצר את מזונו? הסבר בהיר על כלורופיל, פחמן דו-חמצני ואור השמש, כולל ניסוי ביתי פשוט.',
            grade: 'כיתה ו',
            subject: 'מדעים',
            subSubject: 'צמחים ותהליכי צמיחה',
            price: 16,
            originalPrice: 22,
            previewUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80',
            hasAnswerKey: true,
            isBundle: false,
            pageCount: 5,
            downloadsCount: 140,
            viewsCount: 690
          },
          {
            id: 'ws-sci-5',
            title: 'מארז מדעים חקר: עונות השנה, מזג אוויר ועננים',
            description: 'מארז פעילות הכולל טבלת מעקב שבועית אחרי משקעים, סוגי עננים, כיווני רוח ומדידת טמפרטורה.',
            grade: 'כיתה ב',
            subject: 'מדעים',
            subSubject: 'כדור הארץ ומזג אוויר',
            price: 29,
            originalPrice: 45,
            previewUrl: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=600&q=80',
            hasAnswerKey: true,
            isBundle: true,
            pageCount: 12,
            downloadsCount: 230,
            viewsCount: 1150
          },
          {
            id: 'ws-1',
            title: 'מוכנות לקריאה: אותיות פותחות וצלילים ראשונים',
            description: 'תרגול חווייתי לזיהוי אותיות הא\'-ב\', התאמת צליל פותח לתמונה ופיתוח מודעות פונולוגית.',
            grade: 'גן חובה',
            subject: 'עברית ולשון',
            subSubject: 'מוכנות לקריאה',
            price: 12,
            originalPrice: 18,
            previewUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80',
            hasAnswerKey: true,
            isBundle: false,
            pageCount: 4,
            downloadsCount: 142,
            viewsCount: 620
          }
        ]);
      }

      const library = await getCustomerLibrary(customerEmail);
      if (library && library.length > 0) {
        setCustomerLibrary(library);
      } else {
        setCustomerLibrary([
          {
            worksheetId: 'ws-sci-5',
            title: 'מארז מדעים חקר: עונות השנה, מזג אוויר ועננים',
            orderNumber: 'EL-2026-101',
            purchaseDate: new Date().toISOString()
          }
        ]);
      }
    }

    loadData();
  }, [customerEmail]);

  // Cart operations
  const handleAddToCart = (sheet) => {
    if (!cart.some(item => item.id === sheet.id)) {
      setCart(prev => [...prev, sheet]);
    }
  };

  const handleRemoveFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Order completion
  const handleCheckoutSuccess = async (orderData) => {
    setCustomerEmail(orderData.customerEmail);
    
    const newLibraryItems = orderData.items.map(item => ({
      worksheetId: item.id,
      title: item.title,
      orderNumber: `EL-${Math.floor(100 + Math.random() * 900)}`,
      purchaseDate: new Date().toISOString()
    }));

    setCustomerLibrary(prev => [...newLibraryItems, ...prev]);

    try {
      await submitOrder(orderData);
    } catch (e) {
      console.warn('API sync fallback for demo order');
    }

    setCart([]);
    setCurrentView('customer');
  };

  // Admin: Add worksheet
  const handleAddWorksheet = async (sheetData) => {
    try {
      const created = await createWorksheet(sheetData);
      setWorksheets(prev => [created || { ...sheetData, id: `ws-${Date.now()}` }, ...prev]);
    } catch (err) {
      setWorksheets(prev => [{ ...sheetData, id: `ws-${Date.now()}` }, ...prev]);
    }
  };

  // Admin: Update price
  const handleUpdatePrice = async (id, newPrice) => {
    setWorksheets(prev => prev.map(s => s.id === id ? { ...s, price: newPrice } : s));
    try {
      await updateWorksheet(id, { price: newPrice });
    } catch (err) {
      console.warn('Price updated locally');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* Top Navigation */}
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        cartCount={cart.length}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {currentView === 'store' && (
          <HomePage
            worksheets={worksheets}
            onAddToCart={handleAddToCart}
            onPreview={setPreviewSheet}
          />
        )}

        {currentView === 'customer' && (
          <CustomerDashboardPage
            libraryItems={customerLibrary}
            customerEmail={customerEmail}
          />
        )}

        {currentView === 'admin' && (
          <AdminDashboardPage
            worksheets={worksheets}
            onAddWorksheet={handleAddWorksheet}
            onUpdatePrice={handleUpdatePrice}
          />
        )}
      </Box>

      {/* Cart & Checkout Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveItem={handleRemoveFromCart}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      {/* Watermarked Preview Modal */}
      <WorksheetPreviewModal
        worksheet={previewSheet}
        isOpen={Boolean(previewSheet)}
        onClose={() => setPreviewSheet(null)}
        onAddToCart={handleAddToCart}
      />
    </Box>
  );
}
