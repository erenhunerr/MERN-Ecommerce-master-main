import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();


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
    console.log(products);

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
          navigate("/products");
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (

    <div class="p-4 sm:ml-64">
      <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div class="flex items-center justify-center mb-4 rounded dark:bg-gray-800">
          <div>
            <form onSubmit={submitForm} enctype="multipart/form-data" class="max-w-sm mx-auto">
              <div class="mb-5">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ürün Adı</label>
                <input onChange={handleChange} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                dark:focus:border-blue-500" placeholder="Örn. Pierre Cardin Çanta" required />
              </div>
              <div class="mb-5">
                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Açıklama</label>
                <input onChange={handleChange} type="text" name="description" id="description" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                dark:focus:border-blue-500" placeholder="Örn. Erkek Çanta" required />
              </div>
              <div class="mb-5">
                <label for="stock" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stok</label>
                <input onChange={handleChange} type="text" name="stock" id="stock" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                dark:focus:border-blue-500" placeholder="Örn. 10" required />
              </div>
              <div class="mb-5">
                <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kategori</label>
                <input onChange={handleChange} type="text" name="category" id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                dark:focus:border-blue-500" placeholder="Örn. Çanta" required />
              </div>
              <div class="mb-5">
                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fiyat</label>
                <input onChange={handleChange} type="text" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                dark:focus:border-blue-500" placeholder="Örn. 250" required />
              </div>
              <div class="mb-5">
                <label for="images" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fotoğraf Ekle</label>
                <input onChange={handleChange} type="file" name="images" id="images" multiple class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div>
                <p>{products.images.length} adet seçildi.</p>

                <button type="submit" class="text-white mt-3 bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
              text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  {loading ? "Yükleniyor..." : "Fotoğraf Yükle"}
                </button>

              </div>
            </form>

            <Toaster position="top-right" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProducts;
