import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loading from "../components/Loading";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const Details = () => {
  const user = useSelector((state) => state.users.user);

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data, loading, error } = useFetch(`/product/getProduct/${id}`);
  const handleClick = async (product) => {
    try {
      if (user) {
        const res = await axios.post(`/basket/addBasket/${user._id}`, product);
        if (res.status === 201) {
          toast.success("Ürün sepete eklendi");
          window.location.reload(false);
        }
      }
      else {
        toast.error("Lütfen giriş yapınız");
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  console.log(data);
  return (
    <>
      <Header></Header>
      <Navbar></Navbar>
      {loading && <Loading />}
      {!loading &&
        <div>
          <section class="text-gray-700 body-font overflow-hidden bg-white ">
            <div class="container px-5 py-24 mx-auto">
              <div class="lg:w-4/5 mx-auto flex">
                <img
                  alt="ecommerce"
                  class="lg:w-1/2 w-1/3 object-cover object-center rounded border border-gray-200"
                  src={data.images[0].url}
                />
                <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <h2 class="text-sm title-font text-gray-500 tracking-widest">
                    {data.category}
                  </h2>
                  <h1 class="text-gray-900 text-3xl title-font font-medium mb-5 ">
                    {data.name}
                  </h1>
                  <p class="leading-relaxed t">
                    {data.description}
                  </p>
                  <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                    <div class="flex">
                      <span class="mr-3">Renk</span>
                      <button class="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                      <button class="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                      <button class="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                    </div>
                    <div class="flex ml-6 items-center">
                      <span class="mr-3">Ölçü</span>
                      <div class="relative">
                        <select class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                          <option>128GB</option>
                          <option>256GB</option>
                        </select>
                        <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="w-4 h-4"
                            viewBox="0 0 24 24"
                          >
                            <path d="M6 9l6 6 6-6"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="flex">
                    <span class="title-font font-medium text-2xl text-gray-900">
                      {data.price} ₺
                    </span>
                    <button onClick={() => handleClick(data)} class="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                      Sepete Ekle
                    </button>
                    <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                      <svg
                        fill="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Toaster position="top-right"></Toaster>
        </div>}
      <Footer></Footer>
    </>
  );
};

export default Details;
