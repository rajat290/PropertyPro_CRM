import jwt from 'jsonwebtoken';

import * as userModel from '../models/userModel.js';                                                                                        
export const verifyTokenMiddleware = async (req,res, next) => {
let token = req.cookies.token || null;
if (!token) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  }
}

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findUserById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }        

        req.user = user;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token, authorization denied' });
    }
}