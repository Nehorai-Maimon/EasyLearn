/**
 * EasyLearn API Service
 * Handles HTTP requests to the Node.js Express backend with fallback to mock data
 */

const API_BASE_URL = '/api';

/**
 * Fetch all published worksheets with optional filters (including subSubject)
 */
export async function getWorksheets(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.grade) params.append('grade', filters.grade);
    if (filters.subject) params.append('subject', filters.subject);
    if (filters.subSubject) params.append('subSubject', filters.subSubject);
    if (filters.search) params.append('search', filters.search);

    const response = await fetch(`${API_BASE_URL}/worksheets?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch worksheets');
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.warn('[API Warning] Utilizing local fallback data:', error.message);
    return [];
  }
}

/**
 * Fetch single worksheet details by ID
 */
export async function getWorksheetById(id) {
  const response = await fetch(`${API_BASE_URL}/worksheets/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch worksheet ${id}`);
  const result = await response.json();
  return result.data;
}

/**
 * Create a new worksheet (Admin action)
 */
export async function createWorksheet(worksheetData) {
  const response = await fetch(`${API_BASE_URL}/worksheets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(worksheetData)
  });
  if (!response.ok) throw new Error('Failed to create worksheet');
  const result = await response.json();
  return result.data;
}

/**
 * Update existing worksheet price or metadata (Admin action)
 */
export async function updateWorksheet(id, updateData) {
  const response = await fetch(`${API_BASE_URL}/worksheets/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateData)
  });
  if (!response.ok) throw new Error('Failed to update worksheet');
  const result = await response.json();
  return result.data;
}

/**
 * Reorder worksheets in the catalog (Admin action)
 */
export async function reorderWorksheets(orderedIds) {
  const response = await fetch(`${API_BASE_URL}/worksheets/reorder`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderedIds })
  });
  if (!response.ok) throw new Error('Failed to reorder worksheets');
  const result = await response.json();
  return result.data;
}

/**
 * Delete a worksheet from catalog (Admin action)
 */
export async function deleteWorksheet(id) {
  const response = await fetch(`${API_BASE_URL}/worksheets/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete worksheet');
  return true;
}

/**
 * Categories & Subtopics API
 */
export async function getCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.warn('[API Warning] Categories fallback:', error.message);
    return [
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
  }
}

export async function createCategory(catData) {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(catData)
  });
  if (!response.ok) throw new Error('Failed to create category');
  const result = await response.json();
  return result.data;
}

export async function updateCategory(id, updateData) {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateData)
  });
  if (!response.ok) throw new Error('Failed to update category');
  const result = await response.json();
  return result.data;
}

export async function deleteCategory(id) {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete category');
  return true;
}

export async function addSubtopic(catId, subtopic) {
  const response = await fetch(`${API_BASE_URL}/categories/${catId}/subtopics`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subtopic })
  });
  if (!response.ok) throw new Error('Failed to add subtopic');
  const result = await response.json();
  return result.data;
}

export async function deleteSubtopic(catId, subtopic) {
  const response = await fetch(`${API_BASE_URL}/categories/${catId}/subtopics/${encodeURIComponent(subtopic)}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete subtopic');
  const result = await response.json();
  return result.data;
}

/**
 * Fetch customer library ("My Worksheets")
 */
export async function getCustomerLibrary(email = '') {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/my-library?email=${encodeURIComponent(email)}`);
    if (!response.ok) throw new Error('Failed to fetch customer library');
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.warn('[API Warning] Customer library fallback:', error.message);
    return [];
  }
}

/**
 * Submit demo checkout / order
 */
export async function submitOrder(orderData) {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  if (!response.ok) throw new Error('Failed to create order');
  return await response.json();
}

/**
 * Analytics Module Calls (Centralized statistics endpoints)
 */

/**
 * Fetch topic views heatmap analytics
 * @route GET /api/analytics/heatmap
 */
export async function getTopicViewsHeatmap() {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics/heatmap`);
    if (!response.ok) throw new Error('Failed to fetch heatmap');
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    return [
      { topic: 'מדעים - עונות השנה ומזג אוויר', subject: 'מדעים', subSubject: 'כדור הארץ ומזג אוויר', views: 1150, downloads: 230, heatScore: 100, heatLevel: 'HOT' },
      { topic: 'מדעים - מערכת העיכול', subject: 'מדעים', subSubject: 'גוף האדם ובריאות', views: 940, downloads: 189, heatScore: 82, heatLevel: 'HOT' },
      { topic: 'מדעים - מחלקות בעלי החיים', subject: 'מדעים', subSubject: 'בעלי חיים ומערכות אקולוגיות', views: 780, downloads: 165, heatScore: 68, heatLevel: 'WARM' },
      { topic: 'מדעים - פוטוסינתזה וצמחים', subject: 'מדעים', subSubject: 'צמחים ותהליכי צמיחה', views: 690, downloads: 140, heatScore: 60, heatLevel: 'WARM' },
      { topic: 'עברית - מוכנות לקריאה', subject: 'עברית ולשון', subSubject: 'מוכנות לקריאה', views: 620, downloads: 142, heatScore: 54, heatLevel: 'WARM' },
      { topic: 'מדעים - מצבי צבירה', subject: 'מדעים', subSubject: 'חומרים ותכונותיהם', views: 550, downloads: 112, heatScore: 48, heatLevel: 'WARM' },
      { topic: 'חשבון - שברים פשוטים', subject: 'חשבון והנדסה', subSubject: 'שברים', views: 430, downloads: 89, heatScore: 37, heatLevel: 'NORMAL' }
    ];
  }
}

/**
 * Fetch overview KPIs (revenue, downloads, growth)
 * @route GET /api/analytics/overview
 */
export async function getAnalyticsOverview() {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics/overview`);
    if (!response.ok) throw new Error('Failed to fetch overview');
    const result = await response.json();
    return result.data;
  } catch (error) {
    return {
      totalEarnings: 3840,
      totalDownloads: 1045,
      totalViews: 4850,
      activeSheets: 7,
      monthlyGrowthRate: '+18%'
    };
  }
}
