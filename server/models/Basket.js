import mongoose from "mongoose";

const basketSchema = new mongoose.Schema(
    {products: [
        {
            name: String,
            price: Number,
            quantity: Number,
            product_id: String,
        },
    ],
    user_id: {
        type: String,
        required: true,
      },
}
);
const Basket = mongoose.model("basket", basketSchema);

export default Basket;
