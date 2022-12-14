import express from 'express';
import { getAllUsers, registerUser} from "../controllers/user_controller";
const router = express.Router();

router.get('/', getAllUsers);
router.post('/', registerUser);

export default router