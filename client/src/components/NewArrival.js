import React from 'react';
import product1 from "../assets/images/products/product1.jpg";
import product2 from "../assets/images/products/product2.jpg";
import product3 from "../assets/images/products/product3.jpg";
import product4 from "../assets/images/products/product4.jpg";
import useFetch from '../hooks/useFetch';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';


const Banner = () => {
    const user = useSelector((state) => state.users.user);
    const { data, loading, error, reFetchUser } = useFetch("/product/getAllProduct");
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

    return (
        <div class="container pb-16">
            <h2 class="text-2xl font-medium text-gray-800 uppercase mb-6">Ürünler</h2>
            <div class="w-full">
                {loading && <Loading />}
                {!loading && <div class="w-full flex flex-wrap gap-10">{data.map((product) => (product.status === "active" && <div class="w-1/3.5 flex flex-col bg-white shadow rounded overflow-hidden group">
                    <div class="">
                        <img src={product.images[0].url} alt="product 1" class="w-[300px] h-[300px] max-w-full object-cover" />
                    </div>
                    <div class="pt-4 pb-3 px-4">
                        <Link to={`/details/${product._id}`}>
                            <h4 class="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                                {product.name}</h4>
                        </Link>
                        <div class="flex items-baseline mb-1 space-x-2">
                            <p class="text-xl text-primary font-semibold">{product.price}TL</p>
                        </div>

                    </div>
                    <button
                        onClick={() => handleClick(product)} class="block w-7/8 py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition">Sepete Ekle</button>
                </div>))}</div>}


            </div>
            <Toaster position='top-right' />
        </div>
    );
}


export default Banner;