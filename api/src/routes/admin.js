//routes/admin.js
import express from "express";
import {
  getAdminProperties,
  addProperty,
  deleteProperty,
  updateProperty,
  getPropertyDetails,
} from "../controllers/admin/admin.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.get("/properties", getAdminProperties);
router.post("/properties/:category", upload, addProperty);
router.delete("/properties/:id", deleteProperty);
router.get("/properties/:id", getPropertyDetails);
router.put("/properties/:id", upload, updateProperty); 


export default router;
