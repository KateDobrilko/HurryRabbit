import express from 'express';
import checkToken from '../middlewares/checkToken';

import * as UserController from "../controllers/user";

const router = express.Router();

router.get('/current-user', checkToken, UserController.getCurrentUser);
router.get('/users/:id', UserController.getUserById);
export default router;