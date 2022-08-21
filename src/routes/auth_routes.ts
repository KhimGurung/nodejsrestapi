
import express from 'express';
import { loginUser, authenticateUser} from "../controllers/auth_controller";
import { authenticateValidator } from '../middleware/validator';
const router = express.Router();

router.post('/login', loginUser);
router.post('/authenticate', authenticateValidator, authenticateUser);

export default router