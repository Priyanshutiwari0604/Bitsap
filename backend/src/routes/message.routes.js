import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getUsersForSidebar } from '../controller/message.controller.js';
import { getMessages } from '../controller/message.controller.js';
import { sendMessages } from '../controller/message.controller.js';
const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);

router.get("/id",protectRoute,getMessages);

router.post("/send/:id",protectRoute,sendMessages);
export default router;