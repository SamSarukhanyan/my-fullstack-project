//routes/admin.js
import express from "express";
import {
  getAdminProperties,
  addProperty,
  deleteProperty,
  updateProperty,
} from "../controllers/admin/admin.js";
import upload from "../middleware/multer.js";
import { getPropertyDetails } from "../controllers/properties/properties.js";

const router = express.Router();

router.get("/properties", getAdminProperties);
router.post("/properties/:category", upload, addProperty);
router.delete("/properties/:id", deleteProperty);
router.get("/properties/:id", getPropertyDetails);
router.put("/properties/:id", upload, updateProperty); 


export default router;
