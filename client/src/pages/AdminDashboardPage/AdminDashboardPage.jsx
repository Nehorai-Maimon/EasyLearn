import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  Grid,
  Tabs,
  Tab,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Chip,
  LinearProgress,
  Stack
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { getTopicViewsHeatmap } from '../../services/api';

const SCIENCE_SUBTOPICS_OPTIONS = [
  'גוף האדם ובריאות',
  'בעלי חיים ומערכות אקולוגיות',
  'צמחים ותהליכי צמיחה',
  'חומרים ותכונותיהם',
  'כדור הארץ ומזג אוויר',
  'אנרגיה וטכנולוגיה'
];

/**
 * Material-UI Admin Dashboard for Teacher Chani & Administrators
 * Features usage analytics, live Topic Views Heatmap, science subtopics, and live pricing controls
 */
export default function AdminDashboardPage({ worksheets = [], onAddWorksheet, onUpdatePrice }) {
  const [activeTab, setActiveTab] = useState(0); // 0: overview, 1: upload, 2: sheets
  const [heatmapData, setHeatmapData] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    grade: 'כיתה ה',
    subject: 'מדעים',
    subSubject: 'גוף האדם ובריאות',
    price: 15,
    originalPrice: '',
    hasAnswerKey: true,
    isBundle: false,
    pageCount: 4,
    fileName: ''
  });
  const [successMsg, setSuccessMsg] = useState('');
  const [editingPriceId, setEditingPriceId] = useState(null);
  const [tempPrice, setTempPrice] = useState('');

  // Load heatmap analytics data
  useEffect(() => {
    async function fetchHeatmap() {
      const data = await getTopicViewsHeatmap();
      if (data && data.length > 0) {
        setHeatmapData(data);
      }
    }
    fetchHeatmap();
  }, [worksheets]);

  const totalDownloads = worksheets.reduce((sum, s) => sum + (s.downloadsCount || s.downloads || 0), 446);
  const totalEarnings = 3840;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        fileName: file.name,
        title: prev.title || file.name.replace(/\.[^/.]+$/, "")
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) return;

    onAddWorksheet({
      title: formData.title,
      description: formData.description,
      grade: formData.grade,
      subject: formData.subject,
      subSubject: formData.subSubject,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
      hasAnswerKey: formData.hasAnswerKey,
      isBundle: formData.isBundle,
      pageCount: Number(formData.pageCount) || 1,
      previewUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80'
    });

    setSuccessMsg('דף העבודה הועלה בהצלחה ונוסף לקטלוג החנות!');
    setFormData({
      title: '',
      description: '',
      grade: 'כיתה ה',
      subject: 'מדעים',
      subSubject: 'גוף האדם ובריאות',
      price: 15,
      originalPrice: '',
      hasAnswerKey: true,
      isBundle: false,
      pageCount: 4,
      fileName: ''
    });

    setTimeout(() => {
      setSuccessMsg('');
      setActiveTab(2);
    }, 1500);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Top Banner */}
      <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>
          שלום חני, ברוכה הבאה לאזור הניהול שלך 🌸
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          כאן תוכלי לצפות בנתוני השימוש, מפת חום של נושאי הלימוד הכי מבוקשים, ולהעלות דפי עבודה חדשים במדעים וביתר המקצועות.
        </Typography>
      </Paper>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={activeTab} onChange={(e, val) => setActiveTab(val)}>
          <Tab icon={<TrendingUpIcon />} iconPosition="start" label="נתוני שימוש ומפת חום (Heatmap)" sx={{ fontWeight: 700 }} />
          <Tab icon={<UploadFileIcon />} iconPosition="start" label="העלאת דף חדש (Word/PDF)" sx={{ fontWeight: 700 }} />
          <Tab icon={<MenuBookIcon />} iconPosition="start" label={`ניהול דפים ומחירים (${worksheets.length})`} sx={{ fontWeight: 700 }} />
        </Tabs>
      </Box>

      {/* TAB 0: DASHBOARDS & HEATMAP */}
      {activeTab === 0 && (
        <Box>
          {/* KPI Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Paper sx={{ p: 3, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ width: 52, height: 52, borderRadius: 2, bgcolor: 'success.light', color: 'success.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AttachMoneyIcon fontSize="large" />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>הכנסות החודש (₪)</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 900 }}>₪{totalEarnings.toLocaleString()}</Typography>
                  <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 700 }}>+18% מחודש קודם</Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Paper sx={{ p: 3, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ width: 52, height: 52, borderRadius: 2, bgcolor: 'primary.light', color: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <DownloadIcon fontSize="large" />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>סה״כ הורדות</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 900 }}>{totalDownloads}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>דפי עבודה ומארזים</Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Paper sx={{ p: 3, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ width: 52, height: 52, borderRadius: 2, bgcolor: 'warning.light', color: 'warning.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MenuBookIcon fontSize="large" />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>דפי עבודה פעילים</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 900 }}>{worksheets.length}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>מוצגים כעת בחנות</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* TOPIC VIEWS HEATMAP (מפת חום של נושאים נצפים) */}
          <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <WhatshotIcon color="error" fontSize="large" />
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  מפת חום: הנושאים הכי נצפים ומבוקשים באתר (Heatmap)
                </Typography>
              </Box>
              <Chip label="מעודכן ל-30 הימים האחרונים" color="warning" size="small" sx={{ fontWeight: 700 }} />
            </Box>

            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
              מציג באילו תחומי תוכן מורים והורים צפו הכי הרבה – כך תדעי בדיוק אילו דפי עבודה נוספים כדאי לך להעלות!
            </Typography>

            <Stack spacing={2.5}>
              {heatmapData.map((item, idx) => (
                <Box key={idx} sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 3, border: '1px solid #e2e8f0' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                        {item.topic}
                      </Typography>
                      {item.heatLevel === 'HOT' && (
                        <Chip label="🔥 ביקוש שיא (HOT)" size="small" color="error" sx={{ fontWeight: 800, fontSize: '0.75rem' }} />
                      )}
                      {item.heatLevel === 'WARM' && (
                        <Chip label="⚡ ביקוש גבוה" size="small" color="warning" sx={{ fontWeight: 800, fontSize: '0.75rem' }} />
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                        <VisibilityIcon fontSize="inherit" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                        {item.views} צפיות
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 800 }}>
                        {item.downloads} הורדות
                      </Typography>
                    </Box>
                  </Box>

                  {/* Heat visual progress bar */}
                  <LinearProgress
                    variant="determinate"
                    value={item.heatScore}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      bgcolor: '#e2e8f0',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 5,
                        background: item.heatLevel === 'HOT'
                          ? 'linear-gradient(90deg, #f59e0b, #ef4444)'
                          : item.heatLevel === 'WARM'
                          ? 'linear-gradient(90deg, #10b981, #f59e0b)'
                          : 'linear-gradient(90deg, #0ea5e9, #4f46e5)'
                      }
                    }}
                  />
                </Box>
              ))}
            </Stack>

            {/* Smart insight for mother */}
            <Alert
              severity="info"
              icon={<LightbulbIcon color="warning" />}
              sx={{ mt: 3, borderRadius: 3, fontWeight: 600 }}
            >
              <strong>המלצת מערכת לחני:</strong> נושאי <strong>מזג אוויר ועונות השנה</strong> וכן <strong>מערכת העיכול בגוף האדם</strong> נמצאים בביקוש שיא החודש. מומלץ להעלות דפי עבודה ומבחני חזרה נוספים בנושאים אלו.
            </Alert>
          </Paper>
        </Box>
      )}

      {/* TAB 1: UPLOAD WORD/PDF */}
      {activeTab === 1 && (
        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid', borderColor: 'divider', maxWidth: 800, mx: 'auto' }}>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
            העלאת דף עבודה חדש (קובץ Word או PDF)
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            המערכת תמיר את הקובץ ותייצר אוטומטית תצוגה מקדימה מוגנת עם סימן מים.
          </Typography>

          {successMsg && (
            <Alert severity="success" sx={{ mb: 3, fontWeight: 700 }}>
              {successMsg}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            {/* Drag & Drop Area */}
            <Box
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              sx={{
                border: '2px dashed #cbd5e1',
                bgcolor: '#f8fafc',
                borderRadius: 3,
                p: 4,
                textAlign: 'center',
                cursor: 'pointer',
                mb: 3,
                position: 'relative',
                '&:hover': { borderColor: 'primary.main', bgcolor: '#f0f4ff' }
              }}
            >
              <UploadFileIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                גררי לכאן קובץ Word (.docx) או PDF, או לחצי לבחירה
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                הקובץ יישמר במאגר המאובטח ויומר לקובץ מוכן לרכישה
              </Typography>
              {formData.fileName && (
                <Chip label={formData.fileName} color="primary" sx={{ mt: 2, fontWeight: 700 }} />
              )}
              <input
                type="file"
                accept=".docx,.pdf,.doc"
                onChange={handleFileDrop}
                style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
              />
            </Box>

            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  required
                  id="sheet-title"
                  label="שם דף העבודה / המארז"
                  name="title"
                  placeholder="לדוגמה: שברים פשוטים - חיבור וחיסור במכנים שווים"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  id="sheet-desc"
                  label="תיאור קצר ומטרות הלמידה"
                  name="description"
                  placeholder="הסבר קצר על המיומנויות הנלמדות בדף..."
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel id="grade-label">שכבת גיל / כיתה</InputLabel>
                  <Select
                    labelId="grade-label"
                    name="grade"
                    value={formData.grade}
                    label="שכבת גיל / כיתה"
                    onChange={handleInputChange}
                  >
                    <MenuItem value="גן חובה">גן חובה</MenuItem>
                    <MenuItem value="כיתה א">כיתה א׳</MenuItem>
                    <MenuItem value="כיתה ב">כיתה ב׳</MenuItem>
                    <MenuItem value="כיתה ג">כיתה ג׳</MenuItem>
                    <MenuItem value="כיתה ד">כיתה ד׳</MenuItem>
                    <MenuItem value="כיתה ה">כיתה ה׳</MenuItem>
                    <MenuItem value="כיתה ו">כיתה ו׳</MenuItem>
                    <MenuItem value="חטיבה">חטיבת ביניים</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel id="subject-label">מקצוע לימוד</InputLabel>
                  <Select
                    labelId="subject-label"
                    name="subject"
                    value={formData.subject}
                    label="מקצוע לימוד"
                    onChange={handleInputChange}
                  >
                    <MenuItem value="מדעים">🔬 מדעים (התמחות ראשית)</MenuItem>
                    <MenuItem value="חשבון והנדסה">📐 חשבון והנדסה</MenuItem>
                    <MenuItem value="עברית ולשון">📖 עברית ולשון</MenuItem>
                    <MenuItem value="חגים ומועדים">🍎 חגים ועונות</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Dynamic Science Subtopic Dropdown */}
              {formData.subject === 'מדעים' && (
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth>
                    <InputLabel id="subtopic-label">תת-נושא במדעים</InputLabel>
                    <Select
                      labelId="subtopic-label"
                      name="subSubject"
                      value={formData.subSubject}
                      label="תת-נושא במדעים"
                      onChange={handleInputChange}
                    >
                      {SCIENCE_SUBTOPICS_OPTIONS.map(opt => (
                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  label="מחיר לצרכן (₪)"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="מחיר לפני הנחה (אופציונלי למבצע)"
                  name="originalPrice"
                  placeholder="לדוגמה: 20"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <FormControlLabel
                  control={<Checkbox checked={formData.hasAnswerKey} name="hasAnswerKey" onChange={handleInputChange} />}
                  label="כולל דף פתרונות ותשובות למורה"
                />
                <FormControlLabel
                  control={<Checkbox checked={formData.isBundle} name="isBundle" onChange={handleInputChange} />}
                  label="מארז / חוברת מרובת עמודים"
                />
              </Grid>

              <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <Button type="submit" variant="contained" size="large" startIcon={<AutoAwesomeIcon />}>
                  פרסום דף העבודה בחנות
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      )}

      {/* TAB 2: SHEETS & PRICING TABLE */}
      {activeTab === 2 && (
        <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
            רשימת דפי העבודה והתעריפים
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            תוכלי לעדכן מחירים ומבצעים ישירות מהטבלה.
          </Typography>

          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: '#f8fafc' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 800 }}>שם דף העבודה</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>כיתה ומקצוע</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>הורדות / צפיות</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>מחיר נוכחי</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>עדכון מחיר / מבצע</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {worksheets.map(sheet => (
                  <TableRow key={sheet.id} hover>
                    <TableCell sx={{ fontWeight: 700 }}>{sheet.title}</TableCell>
                    <TableCell>
                      {sheet.grade} • {sheet.subject}
                      {sheet.subSubject && (
                        <Chip label={sheet.subSubject} size="small" variant="outlined" sx={{ ml: 1, fontSize: '0.7rem' }} />
                      )}
                    </TableCell>
                    <TableCell>
                      {sheet.downloadsCount || sheet.downloads || 0} הורדות ({sheet.viewsCount || 340} צפיות)
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>₪{sheet.price}</Typography>
                    </TableCell>
                    <TableCell>
                      {editingPriceId === sheet.id ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <TextField
                            size="small"
                            type="number"
                            value={tempPrice}
                            onChange={(e) => setTempPrice(e.target.value)}
                            sx={{ width: 80 }}
                            autoFocus
                          />
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                            onClick={() => {
                              onUpdatePrice(sheet.id, Number(tempPrice));
                              setEditingPriceId(null);
                            }}
                          >
                            שמור
                          </Button>
                        </Box>
                      ) : (
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<EditIcon />}
                          onClick={() => {
                            setEditingPriceId(sheet.id);
                            setTempPrice(sheet.price);
                          }}
                        >
                          שנה מחיר
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
}
