import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from "react-hot-toast";

export default function Basket() {
  const user = useSelector((state) => state.users.user);
  const [dataUser, setDataUser] = useState()
  let totalAmount = 0;
  const { data, loading, error, reFetchUser } = useFetch(`/basket/getBasket/${user._id}`);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUser();
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [])

  const getUser = async () => {
    try {
      const res = await axios.get(`/user/getUserId/${user._id}`);
      setDataUser(res.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/order/pointStatus/", dataUser);
      setDataUser(res.data);
      window.location.reload(false);

    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const orderCompleted = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/order/orderCompleted/${data._id}`);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  const basketDeleted = async (product) => {
    console.log(product);
    try {
      await axios.delete(`/basket/deleteBasket/${user._id}`, product);
      reFetchUser();

    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <div class="container mx-auto mt-10">
      {loading && <Loading />}
      {!loading && dataUser && data ? <div class="flex shadow-md my-10">
        <div class="w-3/4 bg-white px-10 py-10">
          <div class="flex justify-between border-b pb-8">
            <h1 class="font-semibold text-2xl">Sepetim</h1>
            <h2 class="font-semibold text-2xl">{data.products.length} Adet</h2>
          </div>
          <div class="flex mt-10 mb-5">
            <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">Ürün Detayları</h3>
            <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Adet</h3>
            <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Fiyat</h3>
            <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Toplam</h3>
          </div>
          {data.products.map((product) => (<div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">

            <p className='hidden'>{totalAmount += product.price * product.quantity}</p>
            <div class="flex w-2/5">
              <div class="w-20">
                <img class="h-24" src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z" alt="" />
              </div>
              <div class="flex flex-col ml-4 gap-7 flex-grow">
                <span class="font-bold text-sm">{product.name}</span>
                {/* <span class="text-red-500 text-xs">{product.category}</span> */}
                <Link onClick={() => basketDeleted(product._id)} class="font-semibold hover:text-red-500 text-gray-500 text-xs">Sil</Link>
              </div>
            </div>
            <div class="flex justify-center w-1/5">
              {/* <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
              </svg> */}

              <p>{product.quantity} </p>

              {/* <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
              </svg> */}
            </div>
            <span class="text-center w-1/5 font-semibold text-sm">{product.price}</span>
            <span class="text-center w-1/5 font-semibold text-sm">{product.price * product.quantity}</span>
          </div>))}

          <Link to="/" class="flex font-semibold text-indigo-600 text-sm mt-10">

            <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
            Alışverişe Devam Et
          </Link>
        </div>

        <div id="summary" class="w-1/4 px-8 py-10">
          <h1 class="font-semibold text-2xl border-b pb-8">Sipariş Özeti</h1>
          <div class="border-t mt-60 ">
            <div class="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Toplam Fiyat</span>
              <span>{totalAmount} ₺</span>
            </div>
            <div className='w-full flex items-center justify-center'>
              <p className='w-1/2 m-0 text-center text-xl'>{dataUser.point} Puan</p>
              {
                dataUser.pointStatus
                  ? <button onClick={handleClick} class="w-1/2 bg-red-500 rounded-full mb-3 font-semibold hover:bg-red-800 py-3 text-sm text-white uppercase">Puanımı Kullanma</button>
                  : <button onClick={handleClick} class="w-1/2 bg-green-500 rounded-full mb-3 font-semibold hover:bg-green-800 py-3 text-sm text-white uppercase">Puanımı Kullan</button>

              }
            </div>
            <button onClick={orderCompleted} class="bg-indigo-500 font-semibold rounded-full hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Siparişi Onayla</button>
          </div>
        </div>

      </div> : "Sepetinizde ürün bulunmamaktadır."}
      <Toaster position="top-right" />
    </div>

  )
}
