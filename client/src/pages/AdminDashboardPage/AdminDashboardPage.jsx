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
  Stack,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Divider
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
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CategoryIcon from '@mui/icons-material/Category';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircle';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { getTopicViewsHeatmap } from '../../services/api';

const DEFAULT_CATEGORIES = [
  {
    id: 'cat-sci',
    name: 'מדעים',
    slug: 'science',
    icon: '🔬',
    description: 'מדעי הטבע, גוף האדם, עולם החי והצומח, פיזיקה ומזג אוויר',
    subtopics: [
      'גוף האדם ובריאות',
      'בעלי חיים ומערכות אקולוגיות',
      'צמחים ותהליכי צמיחה',
      'חומרים ותכונותיהם',
      'כדור הארץ ומזג אוויר',
      'אנרגיה וטכנולוגיה'
    ]
  },
  {
    id: 'cat-math',
    name: 'חשבון והנדסה',
    slug: 'math',
    icon: '📐',
    description: 'מיומנויות מתמטיות, פעולות חשבון, שברים וגאומטריה',
    subtopics: ['שברים', 'חיבור וחיסור', 'כפל וחילוק', 'גאומטריה ומדידות']
  },
  {
    id: 'cat-heb',
    name: 'עברית ולשון',
    slug: 'hebrew',
    icon: '📖',
    description: 'מודעות פונולוגית, הבנת הנקרא, דקדוק והבעה',
    subtopics: ['מוכנות לקריאה', 'הבנת הנקרא', 'דקדוק ופעלים', 'כתיבה יצירתית']
  },
  {
    id: 'cat-holidays',
    name: 'חגים ומועדים',
    slug: 'holidays',
    icon: '🍎',
    description: 'דפי פעילות עונתיים, מסורת ישראל ולוח השנה העברי',
    subtopics: ['חגי תשרי', 'חנוכה', 'פורים', 'פסח', 'שבועות']
  }
];

/**
 * Material-UI Admin Dashboard for Teacher Chani & Administrators
 * Features:
 * 1. Live Storefront Mirror with in-place reordering, price edits, and full sheet editing
 * 2. Category & Subtopic Management (add/edit categories & subtopics)
 * 3. File Upload for new Word/PDF worksheets
 * 4. Dashboards & Science Topic Views Heatmap
 * 5. Full Worksheets Table
 */
export default function AdminDashboardPage({
  worksheets = [],
  categories = DEFAULT_CATEGORIES,
  onAddWorksheet = () => {},
  onUpdatePrice = () => {},
  onUpdateWorksheet = () => {},
  onReorderWorksheets = () => {},
  onDeleteWorksheet = () => {},
  onAddCategory = () => {},
  onUpdateCategory = () => {},
  onDeleteCategory = () => {},
  onAddSubtopic = () => {},
  onDeleteSubtopic = () => {}
}) {
  const [activeTab, setActiveTab] = useState(0); // 0: mirror, 1: categories, 2: upload, 3: analytics, 4: table
  const [heatmapData, setHeatmapData] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');

  // Storefront Mirror Filter State
  const [mirrorSearch, setMirrorSearch] = useState('');
  const [mirrorSubject, setMirrorSubject] = useState('all');
  const [mirrorSubtopic, setMirrorSubtopic] = useState('all');
  const [mirrorGrade, setMirrorGrade] = useState('all');

  // Edit Worksheet Modal State
  const [editingSheet, setEditingSheet] = useState(null);

  // Edit Category Modal State
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [newCatData, setNewCatData] = useState({ name: '', icon: '📚', description: '', initialSubtopics: '' });
  const [newSubtopicInputs, setNewSubtopicInputs] = useState({});

  // Quick price inline edit state in table
  const [editingPriceId, setEditingPriceId] = useState(null);
  const [tempPrice, setTempPrice] = useState('');

  // Upload Form State
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

  // Selected category subtopics for upload and filter
  const currentCategory = categories.find(c => c.name === formData.subject) || categories[0];
  const availableSubtopics = currentCategory ? currentCategory.subtopics : [];

  const mirrorCurrentCategory = categories.find(c => c.name === mirrorSubject);
  const mirrorAvailableSubtopics = mirrorCurrentCategory ? mirrorCurrentCategory.subtopics : [];

  // Filter worksheets for storefront mirror
  const filteredMirrorSheets = worksheets.filter(sheet => {
    const matchesSearch = !mirrorSearch ||
      sheet.title.toLowerCase().includes(mirrorSearch.toLowerCase()) ||
      (sheet.description && sheet.description.toLowerCase().includes(mirrorSearch.toLowerCase())) ||
      (sheet.subSubject && sheet.subSubject.toLowerCase().includes(mirrorSearch.toLowerCase()));
    const matchesSubject = mirrorSubject === 'all' || sheet.subject === mirrorSubject;
    const matchesSubtopic = mirrorSubtopic === 'all' || sheet.subSubject === mirrorSubtopic;
    const matchesGrade = mirrorGrade === 'all' || sheet.grade.includes(mirrorGrade);
    return matchesSearch && matchesSubject && matchesSubtopic && matchesGrade;
  });

  // Reorder Handler: Move sheet Left (forward in display order) or Right (backward)
  const handleMoveSheet = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= worksheets.length) return;

    const newOrder = [...worksheets];
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;

    onReorderWorksheets(newOrder);
    setSuccessMsg('סדר הדפים בחנות עודכן בהצלחה!');
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  // Toggle Worksheet Active/Draft Status
  const handleToggleStatus = (sheet) => {
    const newStatus = sheet.status === 'DRAFT' ? 'ACTIVE' : 'DRAFT';
    onUpdateWorksheet(sheet.id, { status: newStatus });
    setSuccessMsg(`סטטוס הדף עודכן ל-${newStatus === 'ACTIVE' ? 'פעיל בחנות' : 'טיוטה / מוסתר'}`);
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  // Save Full Worksheet Edits
  const handleSaveSheetEdits = () => {
    if (!editingSheet) return;
    onUpdateWorksheet(editingSheet.id, {
      title: editingSheet.title,
      description: editingSheet.description,
      grade: editingSheet.grade,
      subject: editingSheet.subject,
      subSubject: editingSheet.subSubject,
      price: Number(editingSheet.price),
      originalPrice: editingSheet.originalPrice ? Number(editingSheet.originalPrice) : null,
      pageCount: Number(editingSheet.pageCount) || 1,
      hasAnswerKey: Boolean(editingSheet.hasAnswerKey),
      isBundle: Boolean(editingSheet.isBundle),
      status: editingSheet.status || 'ACTIVE'
    });
    setEditingSheet(null);
    setSuccessMsg('פרטי דף העבודה נשמרו בהצלחה!');
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  // Add Category Handler
  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (!newCatData.name.trim()) return;

    const subs = newCatData.initialSubtopics
      ? newCatData.initialSubtopics.split(',').map(s => s.trim()).filter(Boolean)
      : [];

    onAddCategory({
      name: newCatData.name.trim(),
      icon: newCatData.icon.trim() || '📚',
      description: newCatData.description.trim(),
      subtopics: subs
    });

    setNewCatData({ name: '', icon: '📚', description: '', initialSubtopics: '' });
    setIsCatModalOpen(false);
    setSuccessMsg('הקטגוריה החדשה נוספה בהצלחה!');
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  // Add Subtopic to Category
  const handleAddSubtopicClick = (catId) => {
    const subName = (newSubtopicInputs[catId] || '').trim();
    if (!subName) return;

    onAddSubtopic(catId, subName);
    setNewSubtopicInputs(prev => ({ ...prev, [catId]: '' }));
    setSuccessMsg(`תת-הנושא "${subName}" נוסף בהצלחה!`);
    setTimeout(() => setSuccessMsg(''), 2500);
  };

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
      previewUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
      status: 'ACTIVE'
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
      setActiveTab(0); // Switch to storefront mirror to see the new sheet!
    }, 1500);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Top Banner with Teacher Greeting */}
      <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 4, border: '1px solid', borderColor: 'divider', background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>
              שלום חני, ברוכה הבאה לאזור הניהול שלך 🌸
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              שיקוף חי של חנות דפי העבודה: תוכלי לשנות את סדר התצוגה של הדפים, לעדכן מחירים ומבצעים, ולנהל את תחומי הלימוד והנושאים.
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<UploadFileIcon />}
            onClick={() => setActiveTab(2)}
            sx={{ fontWeight: 800, borderRadius: 3, px: 3, py: 1.2 }}
          >
            העלאת דף חדש
          </Button>
        </Box>

        {/* Global Success Alert */}
        {successMsg && (
          <Alert severity="success" sx={{ mt: 3, fontWeight: 700, borderRadius: 3 }}>
            {successMsg}
          </Alert>
        )}
      </Paper>

      {/* KPI Cards: Always visible for quick glance */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Paper sx={{ p: 3, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2, border: '1px solid #e2e8f0' }}>
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
          <Paper sx={{ p: 3, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2, border: '1px solid #e2e8f0' }}>
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
          <Paper sx={{ p: 3, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2, border: '1px solid #e2e8f0' }}>
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

      {/* Main Admin Navigation Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={activeTab} onChange={(e, val) => setActiveTab(val)} variant="scrollable" scrollButtons="auto">
          <Tab icon={<StorefrontIcon />} iconPosition="start" label={`שיקוף החנות וסדר הדפים (${worksheets.length})`} sx={{ fontWeight: 800 }} />
          <Tab icon={<CategoryIcon />} iconPosition="start" label={`ניהול קטגוריות ותתי-נושאים (${categories.length})`} sx={{ fontWeight: 800 }} />
          <Tab icon={<UploadFileIcon />} iconPosition="start" label="העלאת דף חדש (Word/PDF)" sx={{ fontWeight: 800 }} />
          <Tab icon={<TrendingUpIcon />} iconPosition="start" label="נתוני שימוש ומפת חום (Heatmap)" sx={{ fontWeight: 800 }} />
          <Tab icon={<MenuBookIcon />} iconPosition="start" label="ניהול דפים ומחירים (טבלה)" sx={{ fontWeight: 800 }} />
        </Tabs>
      </Box>

      {/* =========================================================================
          TAB 0: STOREFRONT LIVE MIRROR & REORDERING
          ========================================================================= */}
      {activeTab === 0 && (
        <Box>
          {/* Mirror Header & Control Banner */}
          <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, border: '1px solid #bbf7d0', bgcolor: '#f0fdf4' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              <StorefrontIcon color="success" />
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#166534' }}>
                שיקוף חי של חנות הלקוחות – עריכת סדר התצוגה ומחירים
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#15803d' }}>
              כך בדיוק נראית החנות למורים ולהורים. השתמשי בחצים ⬅️ ו-➡️ כדי לקבוע אילו דפים יוצגו ראשונים, לחצי על עריכה לשינוי מחיר או מבצע, או הפכי דף לטיוטה מוסתרת.
            </Typography>
          </Paper>

          {/* Interactive Filters on Mirror */}
          <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
            <TextField
              fullWidth
              placeholder="חיפוש מהיר בדפי העבודה..."
              value={mirrorSearch}
              onChange={(e) => setMirrorSearch(e.target.value)}
              sx={{ mb: 2, bgcolor: '#f8fafc', borderRadius: 2 }}
            />

            {/* Subject Filters */}
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 800, minWidth: 90, color: 'text.secondary' }}>
                מקצוע ראשי:
              </Typography>
              <Chip
                label="כל המקצועות"
                clickable
                onClick={() => { setMirrorSubject('all'); setMirrorSubtopic('all'); }}
                color={mirrorSubject === 'all' ? 'primary' : 'default'}
                variant={mirrorSubject === 'all' ? 'filled' : 'outlined'}
                sx={{ fontWeight: 800 }}
              />
              {categories.map(cat => (
                <Chip
                  key={cat.id}
                  label={`${cat.icon || '📚'} ${cat.name}`}
                  clickable
                  onClick={() => { setMirrorSubject(cat.name); setMirrorSubtopic('all'); }}
                  color={mirrorSubject === cat.name ? 'primary' : 'default'}
                  variant={mirrorSubject === cat.name ? 'filled' : 'outlined'}
                  sx={{ fontWeight: 800 }}
                />
              ))}
            </Box>

            {/* Subtopics Filters if a category is selected */}
            {mirrorSubject !== 'all' && mirrorAvailableSubtopics.length > 0 && (
              <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 3, border: '1px solid #e2e8f0', mb: 2 }}>
                <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.secondary', display: 'block', mb: 1 }}>
                  תתי נושאים ב{mirrorSubject}:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Chip
                    label="כל תתי הנושאים"
                    clickable
                    size="small"
                    onClick={() => setMirrorSubtopic('all')}
                    color={mirrorSubtopic === 'all' ? 'primary' : 'default'}
                    variant={mirrorSubtopic === 'all' ? 'filled' : 'outlined'}
                  />
                  {mirrorAvailableSubtopics.map(sub => (
                    <Chip
                      key={sub}
                      label={sub}
                      clickable
                      size="small"
                      onClick={() => setMirrorSubtopic(sub)}
                      color={mirrorSubtopic === sub ? 'success' : 'default'}
                      variant={mirrorSubtopic === sub ? 'filled' : 'outlined'}
                      sx={{ fontWeight: 700 }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* Grade Selection */}
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
                  onClick={() => setMirrorGrade(g.id)}
                  color={mirrorGrade === g.id ? 'primary' : 'default'}
                  variant={mirrorGrade === g.id ? 'filled' : 'outlined'}
                  sx={{ fontWeight: 700 }}
                />
              ))}
            </Box>
          </Paper>

          {/* Cards Grid with Admin Reordering & Controls */}
          <Grid container spacing={3}>
            {filteredMirrorSheets.map((sheet, idx) => {
              const globalIndex = worksheets.findIndex(s => s.id === sheet.id);
              const isFirst = globalIndex === 0;
              const isLast = globalIndex === worksheets.length - 1;

              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={sheet.id}>
                  <Card sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    borderRadius: 3,
                    border: '2px solid',
                    borderColor: sheet.status === 'DRAFT' ? 'warning.main' : 'divider',
                    position: 'relative',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': { boxShadow: 4 }
                  }}>
                    {/* Reorder and Order Indicator Header */}
                    <Box sx={{
                      bgcolor: '#0f172a',
                      color: 'white',
                      px: 2,
                      py: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                          label={`מיקום #${globalIndex + 1}`}
                          size="small"
                          color="primary"
                          sx={{ fontWeight: 800, fontSize: '0.75rem' }}
                        />
                        {sheet.status === 'DRAFT' ? (
                          <Chip label="טיוטה (מוסתר)" size="small" color="warning" sx={{ fontWeight: 700, fontSize: '0.7rem' }} />
                        ) : (
                          <Chip label="פעיל בחנות" size="small" color="success" sx={{ fontWeight: 700, fontSize: '0.7rem' }} />
                        )}
                      </Box>

                      {/* Move Left / Right Reorder Buttons */}
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Tooltip title="הזז קדימה בחנות (הופך לעדיפות ראשונה)">
                          <span>
                            <IconButton
                              size="small"
                              sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}
                              disabled={isFirst}
                              onClick={() => handleMoveSheet(globalIndex, -1)}
                            >
                              <ArrowForwardIcon fontSize="small" />
                            </IconButton>
                          </span>
                        </Tooltip>
                        <Tooltip title="הזז אחורה בחנות">
                          <span>
                            <IconButton
                              size="small"
                              sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}
                              disabled={isLast}
                              onClick={() => handleMoveSheet(globalIndex, 1)}
                            >
                              <ArrowBackIcon fontSize="small" />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </Box>
                    </Box>

                    {/* Image Thumbnail with Watermark & Status */}
                    <Box sx={{ position: 'relative', height: 180, bgcolor: '#f1f5f9' }}>
                      <CardMedia
                        component="img"
                        height="180"
                        image={sheet.previewUrl || 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80'}
                        alt={sheet.title}
                        sx={{ objectFit: 'cover' }}
                      />
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
                    </Box>

                    {/* Content Details */}
                    <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                      <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap', gap: 0.5 }}>
                        <Chip label={sheet.subject} size="small" color="primary" sx={{ fontWeight: 800 }} />
                        {sheet.subSubject && (
                          <Chip label={sheet.subSubject} size="small" variant="outlined" color="success" sx={{ fontWeight: 700 }} />
                        )}
                      </Stack>

                      <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, lineHeight: 1.3 }}>
                        {sheet.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.5, maxHeight: 60, overflow: 'hidden' }}>
                        {sheet.description}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 1, borderTop: '1px solid #f1f5f9' }}>
                        <Box>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontWeight: 600 }}>מחיר נוכחי:</Typography>
                          <Typography variant="h5" sx={{ fontWeight: 900, color: 'primary.main' }}>
                            ₪{sheet.price}
                            {sheet.originalPrice && (
                              <Typography component="span" variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary', mr: 1 }}>
                                ₪{sheet.originalPrice}
                              </Typography>
                            )}
                          </Typography>
                        </Box>

                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                          {sheet.downloadsCount || 0} הורדות • {sheet.viewsCount || 0} צפיות
                        </Typography>
                      </Box>
                    </CardContent>

                    {/* Admin Action Buttons */}
                    <CardActions sx={{ p: 2, pt: 0, justifyContent: 'space-between', bgcolor: '#fafafa', borderTop: '1px solid #f1f5f9' }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<EditIcon />}
                          onClick={() => setEditingSheet({ ...sheet })}
                          sx={{ fontWeight: 700 }}
                        >
                          עריכה מלאה
                        </Button>
                        <Tooltip title={sheet.status === 'DRAFT' ? "הפוך לגלוי בחנות" : "הסתר מהחנות (טיוטה)"}>
                          <IconButton
                            size="small"
                            color={sheet.status === 'DRAFT' ? 'warning' : 'default'}
                            onClick={() => handleToggleStatus(sheet)}
                          >
                            {sheet.status === 'DRAFT' ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </Tooltip>
                      </Box>

                      <Tooltip title="מחיקת דף מהקטלוג">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => {
                            if (window.confirm(`האם את בטוחה שברצונך למחוק את דף העבודה "${sheet.title}"?`)) {
                              onDeleteWorksheet(sheet.id);
                              setSuccessMsg(`דף העבודה "${sheet.title}" נמחק.`);
                              setTimeout(() => setSuccessMsg(''), 2500);
                            }
                          }}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}

      {/* =========================================================================
          TAB 1: CATEGORIES & SUBTOPICS MANAGEMENT
          ========================================================================= */}
      {activeTab === 1 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                ניהול מקצועות, קטגוריות ותתי-נושאים
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                כל קטגוריה או תת-נושא שתוסיפי כאן יופיעו מיידית בסרגלי הסינון של חנות ההורים והמורים!
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => setIsCatModalOpen(true)}
              sx={{ fontWeight: 800, borderRadius: 3 }}
            >
              הוספת מקצוע / קטגוריה חדשה
            </Button>
          </Box>

          <Grid container spacing={3}>
            {categories.map(cat => {
              const catWorksheetsCount = worksheets.filter(s => s.subject === cat.name).length;

              return (
                <Grid size={{ xs: 12, md: 6 }} key={cat.id}>
                  <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {/* Category Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Typography variant="h3">{cat.icon || '📚'}</Typography>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 900 }}>
                            {cat.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                            {catWorksheetsCount} דפי עבודה פעילים במקצוע זה
                          </Typography>
                        </Box>
                      </Box>

                      {/* Delete category button */}
                      <Tooltip title="מחיקת קטגוריה זו">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => {
                            if (window.confirm(`האם למחוק את הקטגוריה "${cat.name}"?`)) {
                              onDeleteCategory(cat.id);
                              setSuccessMsg(`הקטגוריה "${cat.name}" נמחקה.`);
                              setTimeout(() => setSuccessMsg(''), 2500);
                            }
                          }}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    {cat.description && (
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                        {cat.description}
                      </Typography>
                    )}

                    <Divider sx={{ my: 1.5 }} />

                    {/* Subtopics Management */}
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5, color: 'primary.main' }}>
                      תתי-נושאים ({cat.subtopics ? cat.subtopics.length : 0}):
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2.5, flexGrow: 1 }}>
                      {cat.subtopics && cat.subtopics.map(sub => (
                        <Chip
                          key={sub}
                          label={sub}
                          onDelete={() => {
                            onDeleteSubtopic(cat.id, sub);
                            setSuccessMsg(`תת הנושא "${sub}" הוסר.`);
                            setTimeout(() => setSuccessMsg(''), 2500);
                          }}
                          color="default"
                          variant="outlined"
                          sx={{ fontWeight: 700, bgcolor: '#f8fafc' }}
                        />
                      ))}
                    </Box>

                    {/* Inline Add Subtopic Input */}
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <TextField
                        size="small"
                        fullWidth
                        placeholder={`הוסף תת-נושא חדש ל${cat.name}...`}
                        value={newSubtopicInputs[cat.id] || ''}
                        onChange={(e) => setNewSubtopicInputs({ ...newSubtopicInputs, [cat.id]: e.target.value })}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSubtopicClick(cat.id);
                          }
                        }}
                      />
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleAddSubtopicClick(cat.id)}
                        sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}
                      >
                        הוסף
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}

      {/* =========================================================================
          TAB 2: UPLOAD NEW WORKSHEET
          ========================================================================= */}
      {activeTab === 2 && (
        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
            העלאת דף עבודה חדש (Word / PDF)
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
            העלי את הקובץ שיצרת, בחרי את מקצוע הלימוד ותת-הנושא, וקבעי את המחיר לחנות.
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            {/* Drag and Drop Zone */}
            <Box
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              sx={{
                border: '2px dashed #cbd5e1',
                borderRadius: 4,
                p: 5,
                textAlign: 'center',
                bgcolor: '#f8fafc',
                mb: 4,
                cursor: 'pointer',
                transition: 'border-color 0.2s',
                '&:hover': { borderColor: 'primary.main', bgcolor: '#f1f5f9' }
              }}
              onClick={() => document.getElementById('sheet-file-input').click()}
            >
              <input
                type="file"
                id="sheet-file-input"
                accept=".docx,.doc,.pdf"
                style={{ display: 'none' }}
                onChange={handleFileDrop}
              />
              <UploadFileIcon sx={{ fontSize: 56, color: 'primary.main', mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                {formData.fileName ? `קובץ נבחר: ${formData.fileName}` : 'גררי לכאן קובץ Word או PDF, או לחצי לבחירה'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                תמיכה בקובצי DOCX ו-PDF עד גודל 25MB
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  required
                  id="sheet-title"
                  label="שם דף העבודה / המארז"
                  name="title"
                  placeholder="לדוגמה: מערכת העיכול באדם: תחנות המזון ומבנה האיברים"
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

              {/* Dynamic Subject Select from Categories */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel id="subject-label">מקצוע לימוד</InputLabel>
                  <Select
                    labelId="subject-label"
                    name="subject"
                    value={formData.subject}
                    label="מקצוע לימוד"
                    onChange={(e) => {
                      const newSub = e.target.value;
                      const matchedCat = categories.find(c => c.name === newSub);
                      setFormData(prev => ({
                        ...prev,
                        subject: newSub,
                        subSubject: matchedCat && matchedCat.subtopics.length > 0 ? matchedCat.subtopics[0] : 'כללי'
                      }));
                    }}
                  >
                    {categories.map(cat => (
                      <MenuItem key={cat.id} value={cat.name}>
                        {cat.icon || '📚'} {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Dynamic Subtopic Select from selected Subject */}
              {availableSubtopics.length > 0 && (
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth>
                    <InputLabel id="subtopic-label">תת-נושא ב{formData.subject}</InputLabel>
                    <Select
                      labelId="subtopic-label"
                      name="subSubject"
                      value={formData.subSubject}
                      label={`תת-נושא ב${formData.subject}`}
                      onChange={handleInputChange}
                    >
                      {availableSubtopics.map(opt => (
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

      {/* =========================================================================
          TAB 3: USAGE ANALYTICS & TOPIC VIEWS HEATMAP
          ========================================================================= */}
      {activeTab === 3 && (
        <Box>
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

                  <LinearProgress
                    variant="determinate"
                    value={item.heatScore}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      bgcolor: '#e2e8f0',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: item.heatLevel === 'HOT' ? 'error.main' : item.heatLevel === 'WARM' ? 'warning.main' : 'primary.main',
                        borderRadius: 5
                      }
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Box>
      )}

      {/* =========================================================================
          TAB 4: SHEETS & PRICING TABLE
          ========================================================================= */}
      {activeTab === 4 && (
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
                  <TableCell sx={{ fontWeight: 800 }}>סדר בחנות</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>שם דף העבודה</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>כיתה ומקצוע</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>הורדות / צפיות</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>מחיר נוכחי</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>עדכון מחיר / מבצע</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {worksheets.map((sheet, index) => (
                  <TableRow key={sheet.id} hover>
                    <TableCell sx={{ fontWeight: 800, color: 'text.secondary' }}>
                      #{index + 1}
                    </TableCell>
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

      {/* =========================================================================
          DIALOG: FULL WORKSHEET EDIT MODAL
          ========================================================================= */}
      {editingSheet && (
        <Dialog open={Boolean(editingSheet)} onClose={() => setEditingSheet(null)} maxWidth="md" fullWidth>
          <DialogTitle sx={{ fontWeight: 900, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            עריכת פרטי דף עבודה
            <IconButton onClick={() => setEditingSheet(null)} size="small">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2.5} sx={{ pt: 1 }}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="כותרת דף העבודה"
                  value={editingSheet.title || ''}
                  onChange={(e) => setEditingSheet({ ...editingSheet, title: e.target.value })}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="תיאור דף העבודה"
                  value={editingSheet.description || ''}
                  onChange={(e) => setEditingSheet({ ...editingSheet, description: e.target.value })}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>שכבת גיל</InputLabel>
                  <Select
                    value={editingSheet.grade || ''}
                    label="שכבת גיל"
                    onChange={(e) => setEditingSheet({ ...editingSheet, grade: e.target.value })}
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
                  <InputLabel>מקצוע לימוד</InputLabel>
                  <Select
                    value={editingSheet.subject || ''}
                    label="מקצוע לימוד"
                    onChange={(e) => setEditingSheet({ ...editingSheet, subject: e.target.value })}
                  >
                    {categories.map(c => (
                      <MenuItem key={c.id} value={c.name}>{c.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="תת-נושא"
                  value={editingSheet.subSubject || ''}
                  onChange={(e) => setEditingSheet({ ...editingSheet, subSubject: e.target.value })}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="מחיר לצרכן (₪)"
                  value={editingSheet.price || ''}
                  onChange={(e) => setEditingSheet({ ...editingSheet, price: e.target.value })}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="מחיר לפני מבצע (₪)"
                  placeholder="אופציונלי"
                  value={editingSheet.originalPrice || ''}
                  onChange={(e) => setEditingSheet({ ...editingSheet, originalPrice: e.target.value })}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Boolean(editingSheet.hasAnswerKey)}
                      onChange={(e) => setEditingSheet({ ...editingSheet, hasAnswerKey: e.target.checked })}
                    />
                  }
                  label="כולל דף פתרונות ותשובות למורה"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Boolean(editingSheet.isBundle)}
                      onChange={(e) => setEditingSheet({ ...editingSheet, isBundle: e.target.checked })}
                    />
                  }
                  label="מארז רב-עמודים"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setEditingSheet(null)}>ביטול</Button>
            <Button variant="contained" onClick={handleSaveSheetEdits} sx={{ fontWeight: 800 }}>
              שמור שינויים
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* =========================================================================
          DIALOG: ADD NEW CATEGORY MODAL
          ========================================================================= */}
      <Dialog open={isCatModalOpen} onClose={() => setIsCatModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 900 }}>הוספת מקצוע / קטגוריה חדשה</DialogTitle>
        <Box component="form" onSubmit={handleCreateCategory}>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid size={{ xs: 8 }}>
                <TextField
                  fullWidth
                  required
                  label="שם המקצוע / הקטגוריה"
                  placeholder="לדוגמה: אנגלית, היסטוריה, אומנות"
                  value={newCatData.name}
                  onChange={(e) => setNewCatData({ ...newCatData, name: e.target.value })}
                />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <TextField
                  fullWidth
                  label="אייקון (Emoji)"
                  value={newCatData.icon}
                  onChange={(e) => setNewCatData({ ...newCatData, icon: e.target.value })}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="תיאור קצר של הקטגוריה"
                  value={newCatData.description}
                  onChange={(e) => setNewCatData({ ...newCatData, description: e.target.value })}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="תתי-נושאים ראשוניים (מופרדים בפסיקים)"
                  placeholder="לדוגמה: דקדוק, אוצר מילים, קריאה"
                  value={newCatData.initialSubtopics}
                  onChange={(e) => setNewCatData({ ...newCatData, initialSubtopics: e.target.value })}
                  helperText="תוכלי להוסיף תתי-נושאים נוספים בכל עת"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setIsCatModalOpen(false)}>ביטול</Button>
            <Button type="submit" variant="contained" sx={{ fontWeight: 800 }}>
              צור מקצוע חדש
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Container>
  );
}
