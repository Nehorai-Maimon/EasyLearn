import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  TextField,
  Button,
  InputAdornment,
  Paper,
  Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ScienceIcon from '@mui/icons-material/Science';

const SCIENCE_SUBTOPICS = [
  { id: 'all', label: 'כל תתי הנושאים במדעים' },
  { id: 'גוף האדם ובריאות', label: 'גוף האדם ובריאות 🫀' },
  { id: 'בעלי חיים ומערכות אקולוגיות', label: 'בעלי חיים ואקולוגיה 🐾' },
  { id: 'צמחים ותהליכי צמיחה', label: 'צמחים ופוטוסינתזה 🌿' },
  { id: 'חומרים ותכונותיהם', label: 'חומרים ומצבי צבירה 🧪' },
  { id: 'כדור הארץ ומזג אוויר', label: 'מזג אוויר ועונות 🌤️' },
  { id: 'אנרגיה וטכנולוגיה', label: 'אנרגיה וחשמל ⚡' }
];

/**
 * Material-UI Public Storefront
 * Highlighting Science primary category with rich subtopics
 */
export default function HomePage({ worksheets = [], onAddToCart, onPreview }) {
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedSubTopic, setSelectedSubTopic] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSheets = worksheets.filter(sheet => {
    const matchesGrade = selectedGrade === 'all' || sheet.grade.includes(selectedGrade);
    const matchesSubject = selectedSubject === 'all' || sheet.subject === selectedSubject;
    const matchesSubTopic = selectedSubTopic === 'all' || sheet.subSubject === selectedSubTopic;
    const matchesSearch = !searchQuery || 
      sheet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sheet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sheet.subSubject && sheet.subSubject.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesGrade && matchesSubject && matchesSubTopic && matchesSearch;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Educational Hero Banner */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          mb: 4,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 50%, #eff6ff 100%)',
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Chip
          icon={<ScienceIcon sx={{ color: 'success.main !important' }} />}
          label="התמחות ייחודית בהוראת מדעים וטבע"
          color="success"
          variant="outlined"
          sx={{ fontWeight: 800, mb: 2, bgcolor: 'white' }}
        />
        <Typography variant="h3" component="h1" sx={{ fontWeight: 900, mb: 1.5, color: 'text.primary' }}>
          דפי עבודה ומערכי שיעור במדעים <Box component="span" sx={{ color: 'primary.main' }}>להורדה מיידית</Box>
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 680, mb: 3, lineHeight: 1.7 }}>
          עשרות שנות ניסיון של מורה בכירה למדעים בבית ספר יסודי וחטיבה: גוף האדם, עולם החי והצומח, חומרים ומזג אוויר.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleIcon color="success" fontSize="small" />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>תואם תכנית הלימודים במדע וטכנולוגיה</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleIcon color="success" fontSize="small" />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>כולל איורים ודפי פתרונות מפורטים</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleIcon color="success" fontSize="small" />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>הורדה מיידית לקובץ PDF</Typography>
          </Box>
        </Stack>
      </Paper>

      {/* Filter and Search Panel */}
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
        <TextField
          fullWidth
          placeholder="חיפוש לפי נושא, מיומנות, ניסוי או מילת מפתח..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 2.5, bgcolor: '#f8fafc', borderRadius: 2 }}
        />

        {/* Primary Subject Selection */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 800, minWidth: 90, color: 'text.secondary' }}>
            מקצוע ראשי:
          </Typography>
          {[
            { id: 'all', label: 'כל המקצועות' },
            { id: 'מדעים', label: '🔬 מדעים (התמחות ראשית)' },
            { id: 'חשבון והנדסה', label: '📐 חשבון והנדסה' },
            { id: 'עברית ולשון', label: '📖 עברית ולשון' },
            { id: 'חגים ומועדים', label: '🍎 חגים ועונות' }
          ].map(s => (
            <Chip
              key={s.id}
              label={s.label}
              clickable
              onClick={() => {
                setSelectedSubject(s.id);
                setSelectedSubTopic('all');
              }}
              color={selectedSubject === s.id ? 'primary' : 'default'}
              variant={selectedSubject === s.id ? 'filled' : 'outlined'}
              sx={{ fontWeight: 800 }}
            />
          ))}
        </Box>

        {/* Science Subtopics (Visible when Science is selected) */}
        {selectedSubject === 'מדעים' && (
          <Box sx={{ p: 2, bgcolor: '#f0fdf4', borderRadius: 3, border: '1px solid #bbf7d0', mb: 2 }}>
            <Typography variant="caption" sx={{ fontWeight: 900, color: '#166534', display: 'block', mb: 1 }}>
              תחומי תוכן במדעים:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {SCIENCE_SUBTOPICS.map(sub => (
                <Chip
                  key={sub.id}
                  label={sub.label}
                  clickable
                  size="small"
                  onClick={() => setSelectedSubTopic(sub.id)}
                  color={selectedSubTopic === sub.id ? 'success' : 'default'}
                  variant={selectedSubTopic === sub.id ? 'filled' : 'outlined'}
                  sx={{ fontWeight: 700, bgcolor: selectedSubTopic === sub.id ? 'success.main' : 'white' }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Grade selection */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 800, minWidth: 90, color: 'text.secondary' }}>
            שכבת גיל:
          </Typography>
          {[
            { id: 'all', label: 'כל השכבות' },
            { id: 'גן', label: 'גן חובה' },
            { id: 'כיתה א', label: 'כיתה א׳' },
            { id: 'כיתה ב', label: 'כיתה ב׳' },
            { id: 'כיתה ג', label: 'כיתות ג׳-ד׳' },
            { id: 'כיתה ה', label: 'כיתות ה׳-ו׳' }
          ].map(g => (
            <Chip
              key={g.id}
              label={g.label}
              clickable
              onClick={() => setSelectedGrade(g.id)}
              color={selectedGrade === g.id ? 'primary' : 'default'}
              variant={selectedGrade === g.id ? 'filled' : 'outlined'}
              sx={{ fontWeight: 700 }}
            />
          ))}
        </Box>
      </Paper>

      {/* Grid of Worksheets */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          תוצאות ({filteredSheets.length} דפי עבודה)
        </Typography>
      </Box>

      {filteredSheets.length === 0 ? (
        <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
            לא נמצאו דפי עבודה המתאימים לסינון המבוקש.
          </Typography>
          <Button
            variant="contained"
            onClick={() => { setSelectedGrade('all'); setSelectedSubject('all'); setSelectedSubTopic('all'); setSearchQuery(''); }}
          >
            איפוס סינונים
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredSheets.map(sheet => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={sheet.id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Image and Watermark */}
                <Box sx={{ position: 'relative', height: 200, bgcolor: '#f1f5f9' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={sheet.previewUrl}
                    alt={sheet.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'rgba(15, 23, 42, 0.05)',
                      pointerEvents: 'none'
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 900,
                        color: 'rgba(15, 23, 42, 0.25)',
                        transform: 'rotate(-25deg)',
                        letterSpacing: 2
                      }}
                    >
                      EASYLEARN תצוגה
                    </Typography>
                  </Box>

                  <Chip
                    label={sheet.grade}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      bgcolor: 'rgba(255, 255, 255, 0.95)',
                      fontWeight: 800,
                      color: 'primary.main'
                    }}
                  />

                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<VisibilityIcon />}
                    onClick={() => onPreview(sheet)}
                    sx={{
                      position: 'absolute',
                      bottom: 10,
                      left: 10,
                      bgcolor: 'rgba(15, 23, 42, 0.85)',
                      color: 'white',
                      '&:hover': { bgcolor: 'rgba(15, 23, 42, 0.95)' }
                    }}
                  >
                    תצוגה מקדימה
                  </Button>
                </Box>

                {/* Card Content */}
                <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                  <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    <Chip label={sheet.subject} size="small" color="primary" sx={{ fontWeight: 800 }} />
                    {sheet.subSubject && (
                      <Chip label={sheet.subSubject} size="small" variant="outlined" color="success" sx={{ fontWeight: 700 }} />
                    )}
                  </Stack>

                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, lineHeight: 1.3 }}>
                    {sheet.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.6 }}>
                    {sheet.description}
                  </Typography>

                  <Stack direction="row" spacing={1}>
                    {sheet.hasAnswerKey && (
                      <Chip
                        icon={<WorkspacePremiumIcon fontSize="small" />}
                        label="כולל פתרונות"
                        size="small"
                        color="success"
                        variant="outlined"
                        sx={{ fontWeight: 700 }}
                      />
                    )}
                    <Chip label={`${sheet.pageCount || 1} עמודים`} size="small" variant="outlined" />
                  </Stack>
                </CardContent>

                {/* Card Actions */}
                <CardActions sx={{ p: 2.5, pt: 0, justifyContent: 'space-between', borderTop: '1px solid #f1f5f9' }}>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 900, color: 'text.primary' }}>
                      ₪{sheet.price}
                      {sheet.originalPrice && (
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ textDecoration: 'line-through', color: 'text.secondary', mr: 1 }}
                        >
                          ₪{sheet.originalPrice}
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() => onAddToCart(sheet)}
                  >
                    הוספה לסל
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
