import Basket from "../models/Basket.js";

export const addBasket = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const { name, price, _id } = req.body;
    const quantity = req.body.quantity || 1;
    const product_id = _id;

    const product = { name, price, quantity, product_id };
    // Sepetinizi veritabanından alın
    let shoppingCart = await Basket.findOne({ user_id: user_id });
    if (!shoppingCart) {
      // Sepet henüz oluşturulmamışsa, yeni bir sepet oluşturun
      shoppingCart = new Basket({ user_id: user_id, products: [product] });
    } else {
      const productIndex = shoppingCart.products.findIndex(
        (product) => product.product_id === product_id
      );
      if (productIndex !== -1) {
        // Eğer ürün zaten varsa, miktarı artırın
        shoppingCart.products[productIndex].quantity += quantity;
      } else {
        // Eğer ürün yoksa, sepete ekleyin
        shoppingCart.products.push(product);
      }
    }
    const savedBasket = await shoppingCart.save();
    res.status(201).json(savedBasket);
  } catch (err) {
    next(err);
  }
};

export const deleteBasket = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const { _id } = req.body;
    const quantityToRemove = req.body.quantity || 1;
    // Sepeti veritabanından alın
    const shoppingCart = await Basket.findOne({ user_id: user_id });
    if (!shoppingCart) {
      return res.status(404).json({ error: "Sepet bulunamadı" });
    }

    // Ürünü sepetten bul
    const productIndex = shoppingCart.products.findIndex(
      (product) => product.product_id.toString() === _id
    );

    if (productIndex === -1) {
      return res.status(404).json({ error: "Ürün sepette bulunamadı" });
    }
    if (shoppingCart.products[productIndex].quantity > quantityToRemove) {
      // Eğer silinecek kadar ürün varsa, adeti düşür
      shoppingCart.products[productIndex].quantity -= quantityToRemove;
    } else {
      // Eğer silinecek kadar ürün yoksa, ürünü tamamen sil
      shoppingCart.products.splice(productIndex, 1);
    }
    const savedBasket = await shoppingCart.save();
    res.status(201).json(savedBasket);
  } catch (error) {
    next(error);
  }
};

export const getBasket = async (req, res, next) => {
  try {
    const basket = await Basket.findOne({ user_id: req.params.id });
    res.status(200).json(basket);
  } catch (error) {
    next(error);
  }
};
