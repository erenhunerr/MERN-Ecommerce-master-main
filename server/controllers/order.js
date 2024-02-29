import Basket from "../models/Basket.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

export const processOrder = async (req, res, next) => {
  try {
    const BasketId = req.params.id;
    let shoppingCart = await Basket.findById(BasketId);
    const user = await User.findById(shoppingCart.user_id);
    let pointsToUse = user.point;
    // Hesapta yeterli puan varsa, kullanılacak puanı belirleyin
    if (pointsToUse > 0) {
      const totalAmount = shoppingCart.products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
      pointsToUse = Math.min(pointsToUse, totalAmount); // Kullanılabilecek puanı toplam fiyatla sınırlayın
    }
    user.point -= pointsToUse;
    console.log(user.point);
    await user.save();

    const totalAmount = shoppingCart.products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
    const order = new Order({
      total: totalAmount - pointsToUse,
      user_id: shoppingCart.user_id,
      products: shoppingCart.products,
    });
    const pointsToAdd = totalAmount * 0.1;
    if (user) {
      user.point += pointsToAdd;
      user.pointStatus = false;
      await user.save();
    }
    // Sepeti boşaltın
    await Basket.findByIdAndDelete(BasketId);
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    next(error);
  }
};

export const addOrder = async (req, res, next) => {
  try {
    const BasketId = req.params.id;
    // Sepetinizi veritabanından alın
    let shoppingCart = await Basket.findById(BasketId);

    const totalAmount = shoppingCart.products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
    const order = new Order({
      total: totalAmount,
      user_id: shoppingCart.user_id,
      products: shoppingCart.products,
    });
    const pointsToAdd = totalAmount * 0.1;
    // Kullanıcı puanlarını güncelleyin
    const user = await User.findById(shoppingCart.user_id);
    console.log(shoppingCart.user_id);
    if (user) {
      user.point += pointsToAdd;
      await user.save();
    }
    // Sepeti boşaltın
    await Basket.findByIdAndDelete(BasketId);
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    next(err);
  }
};

export const pointStatus = async (req, res, next) => {
  const { name, email, phone, password, status, pointStatus, role } = req.body;
  const tempPointStatus = req.body.pointStatus == false ? true : false;
  const updateUser = {
    name: name,
    email: email,
    phone: phone,
    password: password,
    status: status,
    role: role,
    pointStatus: tempPointStatus,
  };

  try {
    const user = await User.findByIdAndUpdate(req.body._id, updateUser);
    res.status(200).json(user);
    console.log(user);
  } catch (error) {
    next(error);
  }
}

export const pointOrder = async (req, res, next) => {
  try {
    const BasketId = req.params.id;
    let shoppingCart = await Basket.findById(BasketId);
    const user = await User.findById(shoppingCart.user_id);
    let pointsToUse = user.point;

    // Hesapta yeterli puan varsa, kullanılacak puanı belirleyin
    if (pointsToUse > 0) {
      const totalAmount = shoppingCart.products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
      pointsToUse = Math.min(pointsToUse, totalAmount); // Kullanılabilecek puanı toplam fiyatla sınırlayın
    }
    user.point -= pointsToUse;
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
};

export const updateStatusOrder = async (req, res, next) => {
  const { user_id, total, status } = req.body;

  const tempStatus = req.body.status == "pending" ? "approved" : "pending";

  const updateOrder = {
    user_id: user_id,
    total: total,
    status: tempStatus,
  };

  try {
    const order = await Order.findByIdAndUpdate(req.body._id, updateOrder);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order deleted !");
  } catch (error) {
    next(error);
  }
};

export const getAllOrder = async (req, res, next) => {
  try {
    const order = await Order.find();
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.find({ user_id: req.params.id });
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};