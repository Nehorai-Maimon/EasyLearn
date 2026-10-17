import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  TextField,
  Typography,
  Box,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

/**
 * Material-UI Cart and Checkout Modal
 * Displays current cart items and facilitates demo checkout
 */
export default function CartModal({ isOpen, onClose, cartItems = [], onRemoveItem, onCheckoutSuccess }) {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerEmail || cartItems.length === 0) return;

    const orderData = {
      customerName: customerName || 'מורה/הורה',
      customerEmail,
      items: cartItems,
      totalAmount: total
    };

    onCheckoutSuccess(orderData);
    setLastOrder(orderData);
    setIsCompleted(true);
  };

  const handleFinish = () => {
    setIsCompleted(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4, p: 1 } }}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ShoppingBagIcon color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 800 }}>עגלת הקניות שלך</Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        {isCompleted ? (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 64, mb: 1.5 }} />
            <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>
              ההזמנה הושלמה בהצלחה! 🎉
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
              הדפים נוספו ישירות ל<strong>אזור האישי שלך</strong> תחת המייל <strong>{lastOrder?.customerEmail}</strong>.
            </Typography>

            <Box sx={{ bgcolor: '#f8fafc', p: 2, borderRadius: 2, mb: 3, display: 'flex', justifyContent: 'space-around', fontWeight: 700 }}>
              <Typography variant="body2">כמות דפים שנרכשו: {lastOrder?.items?.length}</Typography>
              <Typography variant="body2" color="success.main">סה״כ לתשלום (בשלב ה-Demo): ₪0</Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleFinish}
              endIcon={<ArrowBackIcon />}
            >
              מעבר לאזור האישי להורדת הדפים
            </Button>
          </Box>
        ) : cartItems.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
              עגלת הקניות שלך ריקה כרגע.
            </Typography>
            <Button variant="outlined" onClick={onClose}>
              המשך לחנות
            </Button>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            <List disablePadding sx={{ mb: 2 }}>
              {cartItems.map(item => (
                <ListItem key={item.id} sx={{ bgcolor: '#f8fafc', borderRadius: 2, mb: 1 }}>
                  <ListItemText
                    primary={<Typography sx={{ fontWeight: 700 }}>{item.title}</Typography>}
                    secondary={`${item.grade} • ${item.subject}`}
                  />
                  <ListItemSecondaryAction sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>₪{item.price}</Typography>
                    <IconButton edge="end" color="error" size="small" onClick={() => onRemoveItem(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>סה״כ לתשלום:</Typography>
              <Typography variant="h5" sx={{ fontWeight: 900, color: 'primary.main' }}>₪{total}</Typography>
            </Box>

            <Alert severity="info" sx={{ mb: 2.5, borderRadius: 2, fontSize: '0.85rem' }}>
              בשלב ה-MVP, הרכישה הינה ללא סליקה אמיתית לצורך בדיקה. הדפים ייפתחו מיידית באזור האישי שלך!
            </Alert>

            <TextField
              fullWidth
              id="customer-name"
              label="שם מלא"
              placeholder="לדוגמה: יעל לוי"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              required
              id="customer-email"
              type="email"
              label="כתובת אימייל (להצגת הדפים באזור האישי)"
              placeholder="teacher@school.edu.il"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{ py: 1.2, fontWeight: 800 }}
            >
              אישור והורדת הדפים (Demo Checkout)
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
