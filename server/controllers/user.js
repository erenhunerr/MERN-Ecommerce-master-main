import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const addUser = async (req, res, next) => {
  try {
    const { name, email, phone, password, status, point } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      phone,
      password: passwordHash,
      status,
      point,
    });

    const user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      res.status(404).json("E-mail kullanılıyor !");
      return next(createError(404, "User email already!"));
    }

    if (
      !newUser.name ||
      !newUser.email ||
      !newUser.phone ||
      !newUser.password
    ) {
      res.status(401).json("Tüm alanları doldurun !");
      return next(createError(401, "Fill in all fields!"));
    }

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  const { name, email, phone, password, address, status, point } = req.body;

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const updateUser = {
    name: name,
    email: email,
    phone: phone,
    password: passwordHash,
    address: address,
    status: status,
    point: point,
  };

  try {
    const user = await User.findByIdAndUpdate(req.params.id, updateUser);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted !");
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUserId = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateStatusUser = async (req, res, next) => {
  const { name, email, phone, password, status } = req.body;

  const tempStatus = req.body.status == "active" ? "passive" : "active";

  const updateUser = {
    name: name,
    email: email,
    phone: phone,
    password: password,
    status: tempStatus,
  };

  try {
    const user = await User.findByIdAndUpdate(req.body._id, updateUser);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateRoleUser = async (req, res, next) => {
  const { name, email, phone, password, status, role } = req.body;

  const tempRole = req.body.role == "admin" ? "user" : "admin";

  const updateUser = {
    name: name,
    email: email,
    phone: phone,
    password: password,
    status: status,
    role: tempRole
  };

  try {
    const user = await User.findByIdAndUpdate(req.body._id, updateUser);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};