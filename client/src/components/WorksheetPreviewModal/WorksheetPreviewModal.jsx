import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  Typography,
  Box,
  Grid,
  Chip,
  Stack,
  CardMedia
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

/**
 * Material-UI Watermarked Worksheet Preview Modal
 */
export default function WorksheetPreviewModal({ worksheet, isOpen, onClose, onAddToCart }) {
  if (!isOpen || !worksheet) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 4, overflow: 'hidden' } }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Box>
          <Chip label={`${worksheet.grade} • ${worksheet.subject}`} color="primary" size="small" sx={{ fontWeight: 700, mb: 0.5 }} />
          <Typography variant="h5" sx={{ fontWeight: 800 }}>{worksheet.title}</Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Watermarked Document Preview */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                height: 380,
                borderRadius: 3,
                overflow: 'hidden',
                bgcolor: '#f1f5f9',
                border: '1px solid #e2e8f0'
              }}
            >
              <CardMedia
                component="img"
                image={worksheet.previewUrl}
                alt={worksheet.title}
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  bgcolor: 'rgba(15, 23, 42, 0.08)',
                  pointerEvents: 'none'
                }}
              >
                {[1, 2, 3].map(i => (
                  <Typography
                    key={i}
                    variant="h6"
                    sx={{
                      fontWeight: 900,
                      color: 'rgba(15, 23, 42, 0.3)',
                      transform: 'rotate(-25deg)',
                      letterSpacing: 2
                    }}
                  >
                    תצוגה מקדימה - EasyLearn
                  </Typography>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Details & Benefits */}
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
                {worksheet.description}
              </Typography>

              <Stack spacing={1.5} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon color="success" fontSize="small" />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>קובץ PDF דיגיטלי איכותי להדפסה ללא הגבלה</Typography>
                </Box>
                {worksheet.hasAnswerKey && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <WorkspacePremiumIcon color="warning" fontSize="small" />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>כולל דף פתרונות ותשובות מפורט למורה</Typography>
                  </Box>
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <VerifiedUserIcon color="primary" fontSize="small" />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>רישיון אישי שמור לצמיתות באזור האישי שלך</Typography>
                </Box>
              </Stack>
            </Box>

            <Box
              sx={{
                p: 2.5,
                bgcolor: '#f8fafc',
                borderRadius: 3,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 900 }}>
                  ₪{worksheet.price}
                  {worksheet.originalPrice && (
                    <Typography component="span" variant="body1" sx={{ textDecoration: 'line-through', color: 'text.secondary', mr: 1 }}>
                      ₪{worksheet.originalPrice}
                    </Typography>
                  )}
                </Typography>
              </Box>

              <Button
                variant="contained"
                size="large"
                startIcon={<AddShoppingCartIcon />}
                onClick={() => {
                  onAddToCart(worksheet);
                  onClose();
                }}
              >
                הוספה לסל
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
