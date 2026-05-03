import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';
import { verifyTokenMiddleware } from '../middlewares/verifyTokenMiddleware.js';
import { ownershipGuard } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post('/signup', registerUser);

router.post('/login', loginUser);
router.post('/logout', verifyTokenMiddleware, logoutUser);
router.get('/logout', verifyTokenMiddleware, logoutUser);

router.get('/profile', verifyTokenMiddleware, (req, res) => res.json(req.user));
router.get('/test-ownership/:id', verifyTokenMiddleware, ownershipGuard, (req, res) => {
    res.json({ message: "Ownership Verified! You own this property." });
});

export default router;