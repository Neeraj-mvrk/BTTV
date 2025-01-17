import { IUser } from '../models/userModel';

export const getAllUsers = async () => {
  // Example: Replace with your DB logic
  return [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
};

export const addUser = async (userData: any) => {
  // Example: Replace with your DB logic
  const newUser = { id: Date.now(), ...userData };
  return newUser;
};
