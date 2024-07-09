// authRoutes.js
import express from "express";
import { adminAuth } from "../controllers/auth/auth.js";

const router = express.Router();


router.post("/login", adminAuth);

export default router;
