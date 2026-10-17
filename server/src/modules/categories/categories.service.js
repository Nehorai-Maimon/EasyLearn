/**
 * Categories Service
 * In-memory store and CRUD operations for educational categories and subtopics
 */

const INITIAL_CATEGORIES = [
  {
    id: 'cat-sci',
    name: 'מדעים',
    slug: 'science',
    icon: '🔬',
    description: 'מדעי הטבע, גוף האדם, חקר בעלי חיים וצמחים, פיזיקה ומזג אוויר',
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
    subtopics: [
      'שברים',
      'חיבור וחיסור',
      'כפל וחילוק',
      'גאומטריה ומדידות',
      'בעיות מילוליות'
    ]
  },
  {
    id: 'cat-heb',
    name: 'עברית ולשון',
    slug: 'hebrew',
    icon: '📖',
    description: 'מודעות פונולוגית, הבנת הנקרא, דקדוק והבעה',
    subtopics: [
      'מוכנות לקריאה',
      'הבנת הנקרא',
      'דקדוק ופעלים',
      'כתיבה יצירתית',
      'אוצר מילים'
    ]
  },
  {
    id: 'cat-holidays',
    name: 'חגים ומועדים',
    slug: 'holidays',
    icon: '🍎',
    description: 'דפי פעילות עונתיים, מסורת ישראל ולוח השנה העברי',
    subtopics: [
      'חגי תשרי',
      'חנוכה',
      'פורים',
      'פסח',
      'שבועות'
    ]
  }
];

let categoriesStore = [...INITIAL_CATEGORIES];

export const categoriesService = {
  async getAllCategories() {
    return [...categoriesStore];
  },

  async getCategoryById(id) {
    return categoriesStore.find(c => c.id === id) || null;
  },

  async createCategory({ name, icon, description, subtopics = [] }) {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    const newCategory = {
      id: `cat-${Date.now()}`,
      name,
      slug,
      icon: icon || '📚',
      description: description || '',
      subtopics: Array.isArray(subtopics) ? subtopics : []
    };
    categoriesStore.push(newCategory);
    return newCategory;
  },

  async updateCategory(id, updateData) {
    const index = categoriesStore.findIndex(c => c.id === id);
    if (index === -1) return null;

    categoriesStore[index] = {
      ...categoriesStore[index],
      ...updateData
    };
    return categoriesStore[index];
  },

  async deleteCategory(id) {
    const index = categoriesStore.findIndex(c => c.id === id);
    if (index === -1) return false;
    categoriesStore.splice(index, 1);
    return true;
  },

  async addSubtopic(categoryId, subtopicName) {
    const category = categoriesStore.find(c => c.id === categoryId);
    if (!category) return null;

    if (!category.subtopics.includes(subtopicName)) {
      category.subtopics.push(subtopicName);
    }
    return category;
  },

  async removeSubtopic(categoryId, subtopicName) {
    const category = categoriesStore.find(c => c.id === categoryId);
    if (!category) return null;

    category.subtopics = category.subtopics.filter(s => s !== subtopicName);
    return category;
  }
};
