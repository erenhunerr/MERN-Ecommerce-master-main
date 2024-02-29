import express from "express";
import { addProduct, deleteProduct, updateProduct, getAllProduct, updateStatusProduct, getProduct } from "../controllers/product.js";

const router = express.Router();

router.post("/addProduct", addProduct);

router.put("/updateProduct/:id", updateProduct);

router.delete("/deleteProduct/:id", deleteProduct);

router.get("/getProduct/:id", getProduct);
router.get("/getAllProduct", getAllProduct);

router.put("/updateStatusProduct", updateStatusProduct);


export default router;