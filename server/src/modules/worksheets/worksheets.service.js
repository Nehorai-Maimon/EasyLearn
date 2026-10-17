/**
 * Worksheets Service
 * Manages worksheets catalog, filtering, creation, price updates, and views analytics
 */

const INITIAL_SHEETS = [
  // Science - Human Body & Health (Primary domain for Teacher Chani)
  {
    id: "ws-sci-1",
    title: "מערכת העיכול בגוף האדם: מסלול המזון ותפקידי האיברים",
    description: "דף תרגול מדורג עם איור מפורט, שאלות הבנה על תחנות המזון מן הפה ועד הספיגה בדם, ושאלות חשיבה.",
    grade: "כיתה ה",
    subject: "מדעים",
    subSubject: "גוף האדם ובריאות",
    price: 15,
    originalPrice: 20,
    previewUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
    hasAnswerKey: true,
    isBundle: false,
    pageCount: 4,
    downloadsCount: 189,
    viewsCount: 940,
    status: "ACTIVE"
  },
  {
    id: "ws-sci-2",
    title: "מחלקות בעלי החיים: יונקים, עופות, זוחלים, דו-חיים ודגים",
    description: "טבלת השוואה מקיפה בין מחלקות בעלי החיים: כיסוי גוף, נשימה, רבייה ודוגמאות מהטבע הישראלי.",
    grade: "כיתה ד",
    subject: "מדעים",
    subSubject: "בעלי חיים ומערכות אקולוגיות",
    price: 14,
    originalPrice: null,
    previewUrl: "https://images.unsplash.com/photo-1474511320723-9a56873ee67b?auto=format&fit=crop&w=600&q=80",
    hasAnswerKey: true,
    isBundle: false,
    pageCount: 3,
    downloadsCount: 165,
    viewsCount: 780,
    status: "ACTIVE"
  },
  {
    id: "ws-sci-3",
    title: "תהליך הפוטוסינתזה וחלקי הצמח",
    description: "כיצד הצמח מייצר את מזונו? הסבר בהיר על כלורופיל, פחמן דו-חמצני ואור השמש, כולל ניסוי ביתי פשוט.",
    grade: "כיתה ו",
    subject: "מדעים",
    subSubject: "צמחים ותהליכי צמיחה",
    price: 16,
    originalPrice: 22,
    previewUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80",
    hasAnswerKey: true,
    isBundle: false,
    pageCount: 5,
    downloadsCount: 140,
    viewsCount: 690,
    status: "ACTIVE"
  },
  {
    id: "ws-sci-4",
    title: "מצבי צבירה של החומר: מוצק, נוזל וגז",
    description: "הכרת מעברי מצבי צבירה (התכה, הקפאה, התאיידות ועיבוי) באמצעות תופעות יומיומיות ומחזור המים בטבע.",
    grade: "כיתה ג",
    subject: "מדעים",
    subSubject: "חומרים ותכונותיהם",
    price: 12,
    originalPrice: null,
    previewUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    hasAnswerKey: true,
    isBundle: false,
    pageCount: 3,
    downloadsCount: 112,
    viewsCount: 550,
    status: "ACTIVE"
  },
  {
    id: "ws-sci-5",
    title: "מארז מדעים חקר: עונות השנה, מזג אוויר ועננים",
    description: "מארז פעילות הכולל טבלת מעקב שבועית אחרי משקעים, סוגי עננים, כיווני רוח ומדידת טמפרטורה.",
    grade: "כיתה ב",
    subject: "מדעים",
    subSubject: "כדור הארץ ומזג אוויר",
    price: 29,
    originalPrice: 45,
    previewUrl: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=600&q=80",
    hasAnswerKey: true,
    isBundle: true,
    pageCount: 12,
    downloadsCount: 230,
    viewsCount: 1150,
    status: "ACTIVE"
  },
  // Other subjects
  {
    id: "ws-1",
    title: "מוכנות לקריאה: אותיות פותחות וצלילים ראשונים",
    description: "תרגול חווייתי לזיהוי אותיות הא'-ב', התאמת צליל פותח לתמונה ופיתוח מודעות פונולוגית.",
    grade: "גן חובה",
    subject: "עברית ולשון",
    subSubject: "מוכנות לקריאה",
    price: 12,
    originalPrice: 18,
    previewUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
    hasAnswerKey: true,
    isBundle: false,
    pageCount: 4,
    downloadsCount: 142,
    viewsCount: 620,
    status: "ACTIVE"
  },
  {
    id: "ws-2",
    title: "שברים פשוטים: חיבור וחיסור במכנים שווים",
    description: "הסבר מוחשי באמצעות עיגולים ומלבנים, שאלות תרגול מדורגות מן הקל אל המאתגר.",
    grade: "כיתה ד",
    subject: "חשבון והנדסה",
    subSubject: "שברים",
    price: 15,
    originalPrice: null,
    previewUrl: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=600&q=80",
    hasAnswerKey: true,
    isBundle: false,
    pageCount: 3,
    downloadsCount: 89,
    viewsCount: 430,
    status: "ACTIVE"
  }
];

let worksheetsStore = [...INITIAL_SHEETS];

export const worksheetsService = {
  async getAllWorksheets({ grade, subject, subSubject, search } = {}) {
    let result = [...worksheetsStore];

    if (grade && grade !== 'all') {
      result = result.filter(item => item.grade.includes(grade));
    }
    if (subject && subject !== 'all') {
      result = result.filter(item => item.subject === subject);
    }
    if (subSubject && subSubject !== 'all') {
      result = result.filter(item => item.subSubject === subSubject);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.subSubject && item.subSubject.toLowerCase().includes(q))
      );
    }

    return result;
  },

  async getWorksheetById(id) {
    const sheet = worksheetsStore.find(item => item.id === id);
    if (sheet) {
      sheet.viewsCount = (sheet.viewsCount || 0) + 1;
    }
    return sheet || null;
  },

  async createWorksheet(sheetData) {
    const newSheet = {
      id: `ws-${Date.now()}`,
      title: sheetData.title,
      description: sheetData.description || '',
      grade: sheetData.grade,
      subject: sheetData.subject,
      subSubject: sheetData.subSubject || 'כללי',
      price: Number(sheetData.price),
      originalPrice: sheetData.originalPrice ? Number(sheetData.originalPrice) : null,
      previewUrl: sheetData.previewUrl || 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
      hasAnswerKey: Boolean(sheetData.hasAnswerKey),
      isBundle: Boolean(sheetData.isBundle),
      pageCount: Number(sheetData.pageCount) || 1,
      downloadsCount: 0,
      viewsCount: 1,
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    };

    worksheetsStore.unshift(newSheet);
    return newSheet;
  },

  async updateWorksheet(id, updateData) {
    const index = worksheetsStore.findIndex(item => item.id === id);
    if (index === -1) return null;

    worksheetsStore[index] = {
      ...worksheetsStore[index],
      ...updateData
    };

    return worksheetsStore[index];
  },

  /**
   * Analytics: Generates a Heatmap of Subject and Subtopic Views
   * Shows which science topics & subjects have the highest user demand
   */
  async getTopicViewsHeatmap() {
    const topicStats = {};

    worksheetsStore.forEach(sheet => {
      const key = sheet.subSubject ? `${sheet.subject} - ${sheet.subSubject}` : sheet.subject;
      if (!topicStats[key]) {
        topicStats[key] = {
          topic: key,
          subject: sheet.subject,
          subSubject: sheet.subSubject || '',
          views: 0,
          downloads: 0,
          sheetsCount: 0
        };
      }
      topicStats[key].views += sheet.viewsCount || 0;
      topicStats[key].downloads += sheet.downloadsCount || 0;
      topicStats[key].sheetsCount += 1;
    });

    const list = Object.values(topicStats).sort((a, b) => b.views - a.views);

    // Calculate maximum views for relative heatmap score (0% to 100%)
    const maxViews = Math.max(...list.map(t => t.views), 1);
    return list.map(item => ({
      ...item,
      heatScore: Math.round((item.views / maxViews) * 100),
      heatLevel: (item.views / maxViews) > 0.75 ? 'HOT' : (item.views / maxViews) > 0.4 ? 'WARM' : 'NORMAL'
    }));
  }
};
