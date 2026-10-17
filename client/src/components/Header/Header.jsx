import React from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  Button,
  IconButton,
  Badge,
  useTheme
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

/**
 * Material-UI Global Header Navigation
 * Handles view switching between Storefront, Customer Area, and Admin Portal
 */
export default function Header({ currentView, onViewChange, cartCount, onOpenCart }) {
  const theme = useTheme();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Brand Logo & Name */}
          <Box
            onClick={() => onViewChange('store')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              cursor: 'pointer'
            }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2.5,
                background: 'linear-gradient(135deg, #4f46e5, #818cf8)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
              }}
            >
              <MenuBookIcon fontSize="medium" />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 900, lineHeight: 1.1, color: 'text.primary' }}>
                EasyLearn
              </Typography>
              <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 700 }}>
                דפי עבודה מאת המורה חני
              </Typography>
            </Box>
          </Box>

          {/* Navigation Views Switcher */}
          <Box
            sx={{
              display: 'flex',
              bgcolor: '#f1f5f9',
              p: 0.5,
              borderRadius: 50,
              gap: 0.5
            }}
          >
            <Button
              onClick={() => onViewChange('store')}
              variant={currentView === 'store' ? 'contained' : 'text'}
              color="primary"
              size="small"
              sx={{
                borderRadius: 50,
                px: 2,
                color: currentView === 'store' ? 'white' : 'text.secondary',
                bgcolor: currentView === 'store' ? 'primary.main' : 'transparent',
                fontWeight: 700
              }}
            >
              חנות דפי העבודה
            </Button>

            <Button
              onClick={() => onViewChange('customer')}
              variant={currentView === 'customer' ? 'contained' : 'text'}
              color="primary"
              size="small"
              startIcon={<AccountCircleIcon fontSize="small" />}
              sx={{
                borderRadius: 50,
                px: 2,
                color: currentView === 'customer' ? 'white' : 'text.secondary',
                bgcolor: currentView === 'customer' ? 'primary.main' : 'transparent',
                fontWeight: 700
              }}
            >
              האזור האישי שלי
            </Button>

            <Button
              onClick={() => onViewChange('admin')}
              variant={currentView === 'admin' ? 'contained' : 'text'}
              color="secondary"
              size="small"
              startIcon={<AdminPanelSettingsIcon fontSize="small" />}
              sx={{
                borderRadius: 50,
                px: 2,
                color: currentView === 'admin' ? 'white' : 'text.secondary',
                bgcolor: currentView === 'admin' ? '#7c3aed' : 'transparent',
                fontWeight: 700
              }}
            >
              אזור ניהול (אמא)
            </Button>
          </Box>

          {/* Cart Trigger */}
          <Box>
            <IconButton
              onClick={onOpenCart}
              aria-label="עגלת קניות"
              sx={{
                bgcolor: 'white',
                border: '1px solid',
                borderColor: 'divider',
                p: 1.2,
                '&:hover': { bgcolor: '#f1f5f9' }
              }}
            >
              <Badge badgeContent={cartCount} color="warning">
                <ShoppingBagIcon sx={{ color: 'text.primary' }} />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
