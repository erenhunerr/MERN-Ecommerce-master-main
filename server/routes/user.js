import express from "express";
import { addUser, updateUser, getUser, getUserId, updateStatusUser, deleteUser, updateRoleUser } from "../controllers/user.js";

const router = express.Router();

router.post("/addUser", addUser);

router.put("/updateUser/:id", updateUser);

router.delete("/deleteUser/:id", deleteUser);

router.get("/getUser", getUser);

router.get("/getUserId/:id", getUserId);

router.put("/updateStatusUser", updateStatusUser);

router.put("/updateRoleUser", updateRoleUser);




export default router;