import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import basketRouter from "./routes/basket.js";
import orderRouter from "./routes/order.js";
import authRouter from "./routes/auth.js";

dotenv.config();

const app = express();

const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected MongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

app.use(
  express.json({
    limit: "200mb",
  })
);
app.use(cors());

app.use("/user", userRouter);
app.use("/basket", basketRouter);
app.use("/order", orderRouter);
app.use("/product", productRouter);
app.use("/auth", authRouter);

app.listen(process.env.PORT, () => {
  connect();
  console.log("Connected to backend.");
});
