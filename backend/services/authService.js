import bcrypt from 'bcrypt';
import * as userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

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

//login 

export const loginUser = async (email, password) => {
    //1. find user 
    const user = await userModel.findUserByEmail(email);

    if (!user) {
        throw new Error('Invalid email or password');
    }

    //2. compare password 
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }
    //3. genrate JWT 
    const token = jwt.sign(
        {
            id: user.id,
            role: user.role,
            token_version: user.token_version
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    // return user (without password) and token
    const { password_hash, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };

}