import { Router } from 'express';
import {
  registerUser,
  loginUser,
} from '#controllers/authenticateController.js';
import authenticateToken from '#middlewares/authenticateToken.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/protected', authenticateToken, (req, res) => {
  res
    .status(200)
    .json({
      message: `Hello, ${req.user.username}. This is a protected route!`,
    });
});

export default router;
