import express from "express";
import {
  getProperties,
  getPropertiesByCategory,
  getPropertyDetails,
} from "../controllers/properties/properties.js";

const router = express.Router();

router.get("/properties", getProperties);
router.get("/properties/:id", getPropertyDetails);
router.get("/properties/category/:category", getPropertiesByCategory);

export default router;
