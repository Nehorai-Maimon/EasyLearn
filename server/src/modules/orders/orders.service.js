/**
 * Orders Service
 * Handles customer order placement, library generation, and purchases history
 */

const INITIAL_ORDERS = [
  {
    id: "ord-101",
    orderNumber: "EL-2026-101",
    customerId: "usr-customer-1",
    customerEmail: "teacher@school.edu.il",
    customerName: "רונית כהן",
    totalAmount: 39,
    status: "COMPLETED",
    items: [
      {
        worksheetId: "ws-3",
        title: "מארז חגי תשרי המלא: 25 דפי פעילות ויצירה",
        priceAtPurchase: 39,
        downloadUrl: "#download-ws-3"
      }
    ],
    createdAt: "2026-10-15T09:30:00.000Z"
  }
];

let ordersStore = [...INITIAL_ORDERS];

export const ordersService = {
  async getCustomerLibrary(email) {
    const customerOrders = email 
      ? ordersStore.filter(o => o.customerEmail.toLowerCase() === email.toLowerCase())
      : ordersStore;

    const libraryItems = [];
    customerOrders.forEach(order => {
      order.items.forEach(item => {
        if (!libraryItems.some(i => i.worksheetId === item.worksheetId)) {
          libraryItems.push({
            ...item,
            purchaseDate: order.createdAt,
            orderNumber: order.orderNumber
          });
        }
      });
    });

    return libraryItems;
  },

  async createOrder({ customerName, customerEmail, items, totalAmount }) {
    const newOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: `EL-2026-${Math.floor(100 + Math.random() * 900)}`,
      customerId: `usr-${Date.now()}`,
      customerEmail,
      customerName: customerName || 'מורה/הורה',
      totalAmount: totalAmount || 0,
      status: 'COMPLETED',
      items: items.map(item => ({
        worksheetId: item.id || item.worksheetId,
        title: item.title,
        priceAtPurchase: item.price || 0,
        downloadUrl: `#download-${item.id || item.worksheetId}`
      })),
      createdAt: new Date().toISOString()
    };

    ordersStore.unshift(newOrder);
    return newOrder;
  }
};
