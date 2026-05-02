import * as authService from '../services/authService.js';

export const registerUser = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await authService.registerUser(userData);
        res.status(201).json({
            message: 'User registered successfully',
            user: newUser
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}