import express from "express";
import { addBasket, deleteBasket, getBasket, } from "../controllers/basket.js";

const router = express.Router();

router.post("/addBasket/:id", addBasket);

router.delete("/deleteBasket/:id", deleteBasket);

router.get("/getBasket/:id", getBasket);

export default router;