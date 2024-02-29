import Product from "../models/Product.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const addProduct = async (req, res, next) => {
  try {
    const { name, price, description, stock, category, status, images } = req.body;
    let newProduct = new Product({
      name,
      price,
      description,
      stock,
      category,
      status,
      images,
    });
    console.log(newProduct);
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.description ||
      !newProduct.stock ||
      !newProduct.category
    ) {
      res.status(401).json("Tüm alanları doldurun !");
    }

    let tempImages = images;
    let imagesBuffer = [];

    for (let i = 0; i < tempImages.length; i++) {
      const result = await cloudinary.uploader.upload(tempImages[i], {
        folder: "products",
      });

      imagesBuffer.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    newProduct.images = imagesBuffer;

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  const { name, price, description, stock, category } = req.body;

  const updateProduct = {
    name: name,
    price: price,
    description: description,
    stock: stock,
    category: category,
  };

  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateProduct
    );
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product deleted !");
  } catch (error) {
    next(error);
  }
};
export const getAllProduct = async (req, res, next) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateStatusProduct = async (req, res, next) => {
  const { name, price, description, stock, status, category, images } = req.body;

  const tempStatus = req.body.status == "active" ? "passive" : "active";

  const updateProduct = {
    name: name,
    price: price,
    description: description,
    stock: stock,
    status: tempStatus,
    category: category,
    images: images,
  };

  try {
    const product = await Product.findByIdAndUpdate(req.body._id, updateProduct);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

