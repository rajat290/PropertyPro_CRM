import * as authService from '../services/authService.js';
import * as userModel from '../models/userModel.js';

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

export const loginUser = async( req, res) => {
   try{
    const { email, password } = req.body;
    // service call
    const { user, token } = await authService.loginUser(email, password);

    // store token into secure http-only cookie
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // only send cookie over HTTPS in production
        maxAge: 3600000 // 1 hour
    });

    res.status(200).json({
        message: 'login successful',
        user: user
     });
   } catch (error) {
    res.status(400).json({
        message: error.message  
    })
    
} 

}

// Logout controller - increments token_version to invalidate tokens, clears cookie
export const logoutUser = async (req, res) => {
    try {
        // Increase token version to invalidate existing tokens
        await userModel.incrementTokenVersion(req.user.id);
        // Clear cookie from browser
        res.clearCookie('token');
        res.status(200).json({
            message: 'Logout successful'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error logging out user'
        }); 
    }
}

