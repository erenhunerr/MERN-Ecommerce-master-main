import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {products: [
    ],
    user_id: {
        type: String,
        required: true,
      },
    total: {
        type: Number,
        required: true,
      },
    status: {
        default: "pending",
        type: String,
        required: true,
      },
}
);
const Order = mongoose.model("order", orderSchema);

export default Order;
