import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      default: " ",
      type: String,
    },
    role: {
      default: "user",
      type: String,
    },
    status: {
      default: "active",
      type: String,
    },
    point: {
      default: 0,
      type: Number,
    },
    pointStatus: {
      default: false,
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("users", userSchema);

export default User;
