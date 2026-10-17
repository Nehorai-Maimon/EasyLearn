/**
 * Users Service
 * Manages user accounts, authentication data, and roles (ADMIN / CUSTOMER)
 */

// Initial mock database of users
const MOCK_USERS = [
  {
    id: "usr-admin-1",
    email: "chani.teacher@easylearn.co.il",
    name: "המורה חני",
    role: "ADMIN",
    createdAt: new Date().toISOString()
  },
  {
    id: "usr-admin-2",
    email: "nehoraimimon@gmail.com",
    name: "נהוראי מימון",
    role: "ADMIN",
    createdAt: new Date().toISOString()
  },
  {
    id: "usr-customer-1",
    email: "teacher@school.edu.il",
    name: "רונית כהן",
    role: "CUSTOMER",
    createdAt: new Date().toISOString()
  }
];

let usersStore = [...MOCK_USERS];

export const usersService = {
  async getAllUsers() {
    return usersStore;
  },

  async getUserByEmail(email) {
    return usersStore.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  },

  async getUserById(id) {
    return usersStore.find(u => u.id === id) || null;
  },

  async createUser({ email, name, role = 'CUSTOMER' }) {
    const existing = await this.getUserByEmail(email);
    if (existing) {
      throw new Error(`User with email ${email} already exists`);
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      email,
      name,
      role: role.toUpperCase(),
      createdAt: new Date().toISOString()
    };

    usersStore.push(newUser);
    return newUser;
  }
};
