import bcrypt from 'bcrypt';
import * as userModel from '../models/userModel.js';

export const registerUser = async (userData) => {
    const { name, email, password, role } = userData;
    
    // Basic validation
    if (!name || !email || !password || !role) {
        throw new Error('Missing required fields: name, email, password, role');
    }
    if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
    }
    
    // Check if user already exists
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
        throw new Error('User already exists with this email');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user and save to database
    const newUser = await userModel.createNewUser(name, email, hashedPassword, role);
    return newUser;

};
