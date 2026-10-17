import React, { useState } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Alert,
  TextField,
  InputAdornment,
  Stack
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import FolderOffIcon from '@mui/icons-material/FolderOff';

/**
 * Material-UI Customer Personal Area ("האזור האישי שלי")
 * Displays purchased materials with personal licensing and re-download capabilities
 */
export default function CustomerDashboardPage({ libraryItems = [], customerEmail = 'teacher@school.edu.il' }) {
  const [downloadNotice, setDownloadNotice] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = libraryItems.filter(item => 
    !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = (item, type = 'worksheet') => {
    setDownloadNotice({
      title: item.title,
      type: type === 'worksheet' ? 'דף העבודה המלא (PDF)' : 'דף פתרונות ותשובות (PDF)',
      licensee: customerEmail
    });

    setTimeout(() => {
      setDownloadNotice(null);
    }, 4500);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Banner */}
      <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>
          האזור האישי שלי 🎓
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          שלום, <strong>{customerEmail}</strong> | כאן שמורים כל חומרי הלימוד שרכשת וזמינים להורדה חוזרת בכל עת.
        </Typography>
      </Paper>

      {/* Download Alert Notice */}
      {downloadNotice && (
        <Alert
          severity="success"
          icon={<VerifiedUserIcon />}
          sx={{ mb: 3, borderRadius: 3, fontWeight: 700 }}
        >
          מוריד כעת: {downloadNotice.type} | הקובץ נחתם דיגיטלית עם רישיון אישי עבור: {downloadNotice.licensee}
        </Alert>
      )}

      {/* Search Toolbar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <TextField
          placeholder="חיפוש בספרייה האישית שלי..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            )
          }}
          sx={{ width: { xs: '100%', sm: 360 }, bgcolor: 'white', borderRadius: 2 }}
        />

        <Chip
          label={`${libraryItems.length} דפים בספרייה`}
          color="primary"
          sx={{ fontWeight: 800, px: 1 }}
        />
      </Box>

      {/* Library Grid */}
      {filteredItems.length === 0 ? (
        <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
          <FolderOffIcon sx={{ fontSize: 56, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
            אין עדיין דפי עבודה בספרייה שלך
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 450, mx: 'auto' }}>
            כל דף עבודה או מארז שתרכוש בחנות יופיע כאן אוטומטית ויהיה זמין להורדה חוזרת לתמיד.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredItems.map((item, idx) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.worksheetId || idx}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                    <Chip label="רישיון שימוש פעיל" color="success" size="small" sx={{ fontWeight: 800 }} />
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                      הזמנה #{item.orderNumber || 'EL-101'}
                    </Typography>
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, lineHeight: 1.35 }}>
                    {item.title}
                  </Typography>

                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    תאריך רכישה: {item.purchaseDate ? new Date(item.purchaseDate).toLocaleDateString('he-IL') : '15/10/2026'}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', fontSize: '0.8rem' }}>
                    <VerifiedUserIcon fontSize="inherit" color="action" />
                    <span>מוגן בזכויות יוצרים ומורשה לשימוש בכיתתך בלבד</span>
                  </Box>
                </CardContent>

                <CardActions sx={{ p: 2.5, pt: 0, gap: 1 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<DownloadIcon />}
                    onClick={() => handleDownload(item, 'worksheet')}
                  >
                    הורד דף עבודה (PDF)
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<WorkspacePremiumIcon />}
                    onClick={() => handleDownload(item, 'solutions')}
                  >
                    פתרונות
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
