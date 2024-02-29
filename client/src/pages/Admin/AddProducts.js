import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

function AddProducts() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState({
    name: undefined,
    price: undefined,
    description: undefined,
    stock: undefined,
    category: undefined,
    images: [],
  });

  const handleChange = (e) => {
    if (e.target.id === "images") {
      // If the target is the 'images' property, update the images array
      const files = Array.from(e.target.files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setProducts((prev) => ({
            ...prev,
            images: [...prev.images, reader.result], // Update the 'images' property as an array
          }));
        };
      });
    } else {
      // Otherwise, update the other properties
      setProducts((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
  };

  const submitForm = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (
        products.name === undefined ||
        products.name === "" ||
        products.price === undefined ||
        products.price === "" ||
        products.description === undefined ||
        products.description === "" ||
        products.stock === undefined ||
        products.stock === "" ||
        products.category === undefined ||
        products.category === "" ||
        products.images.length === 0
      ) {
        toast.error("Tüm alanları doldurun !");
        return;
      } else {
        const res = await axios.post(
          "http://localhost:3001/product/addProduct",
          products
        );
        console.log(res);
        if (res.status === 201) {
          setLoading(false);
          setProducts({
            name: "",
            price: "",
            description: "",
            stock: "",
            category: "",
            images: [],
          });
          toast.success("Product added successfully");
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={submitForm} enctype="multipart/form-data">
        <label>
          Name:
          <input type="text" name="name" id="name" onChange={handleChange} />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            id="price"
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            id="description"
            onChange={handleChange}
          />
        </label>
        <label>
          Stock:
          <input
            type="number"
            name="stock"
            id="stock"
            onChange={handleChange}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            id="category"
            onChange={handleChange}
          />
        </label>
        <div>
          <label>
            Images:
            <input
              onChange={handleChange}
              type="file"
              id="images"
              name="images"
              multiple
            />
          </label>
        </div>
        {products.name === undefined ||
          products.name === "" ||
          products.price === undefined ||
          products.price === "" ||
          products.description === undefined ||
          products.description === "" ||
          products.stock === undefined ||
          products.stock === "" ||
          products.category === undefined ||
          products.category === "" ||
          products.images.length === 0 || (
            <div>
            <p>{products.images.length} adet seçildi.</p>

            <button type="submit">
              {loading ? "Yükleniyor..." : "Fotoğraf Yükle"}
            </button>
            </div>

          )}
      </form>
      <Toaster position="top-right" />
    </div>
  );
}

export default AddProducts;
