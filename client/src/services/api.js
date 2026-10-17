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
