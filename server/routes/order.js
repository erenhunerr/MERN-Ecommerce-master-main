import express from "express";
import { addOrder, deleteOrder, getAllOrder, getOrder, pointOrder, pointStatus, processOrder, updateStatusOrder, } from "../controllers/order.js";

const router = express.Router();

router.get("/getAllOrder", getAllOrder);
router.get("/getOrder/:id", getOrder);

router.delete("/deleteOrder/:id", deleteOrder);

router.post("/addOrder/:id", addOrder);

router.put("/pointOrder/:id", pointOrder);

router.put("/pointStatus", pointStatus);

router.post('/orderCompleted/:id', processOrder);


router.put("/updateStatusOrder", updateStatusOrder);


export default router;