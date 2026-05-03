import jwt from 'jsonwebtoken';
import * as userModel from '../models/userModel.js';
import * as propertyModel from '../models/propertyModel.js';

export const authMiddleware = async (req, res, next) => {
// 1. Get token from cookie
const token = req.cookies.token;

// 2. If no token, block access and return error
if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
}

try {
    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Fetch full user data (async like verifyTokenMiddleware)
    req.user = await userModel.findUserById(decoded.id);
    if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
    }
    
    // 5. Proceed to next middleware/controller
    next();
} catch (error) {
    res.status(403).json({ message: 'Invalid token, authorization denied' });
}
};


export const roleMiddleware = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Access denied, insufficient permissions' });
        }
        next();
    }
}

export const ownershipGuard = async (req, res, next) => {
    // req.params.id humesha string hota hai, isliye parseInt use karna safe hai
    const propertyId = parseInt(req.params.id); 
    const userId = req.user.id;

    try {
        if (req.user.role === 'admin') return next();

        const property = await propertyModel.getPropertyOwner(propertyId);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        // Logic Check: Kya logged-in user ki ID aur property ka agent_id same hai?
        if (property.agent_id !== userId) {
            return res.status(403).json({ 
                message: 'Access Denied: You are not the owner of this property' 
            });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Error checking property ownership' });
    }
};




