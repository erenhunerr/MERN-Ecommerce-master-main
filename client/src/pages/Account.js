import React, { useEffect, useState } from 'react'
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Copyright from "../components/Copyright";
import avatar from "../assets/images/avatar.png";
import useFetch from '../hooks/useFetch';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

function Account() {
    const user = useSelector((state) => state.users.user);
    const { data, loading, error, reFetchUser } = useFetch(`/user/getUserId/${user._id}`);
    const [order, setOrder] = useState()
    const [open, setOpen] = useState(false)

    const [updateUser, setUpdateUser] = useState({
        name: undefined,
        phone: undefined,
        address: undefined,
        email: undefined,
        password: undefined,
        password2: undefined,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getOrders();
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        setUpdateUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        console.log("sadasdas");
        e.preventDefault();
        try {
            if (updateUser.password === updateUser.password2) {
                const res = await axios.put(`http://localhost:3001/user/updateUser/${user._id}`, updateUser);
                if (res.status == 200) {
                    localStorage.setItem("user", JSON.stringify(res.data));
                    window.location.reload(false);
                    // setOpen(false)
                    // toast.success("Güncelleme Başarılı");
                }
                else {
                    toast.error("Şifreler uyuşmuyor");
                }
            }
        } catch (error) {
            toast.error(error.response.data);
        }
    };

    const getOrders = async () => {
        try {
            const res = await axios.get(`/order/getOrder/${user._id}`);
            setOrder(res.data)

        } catch (error) {
            toast.error(error.response.data);
        }
    };
    return (
        <>
            <Header></Header>
            <Navbar></Navbar>
            <div class="container py-4 flex items-center gap-3">
                <a href="../index.html" class="text-primary text-base">
                    <i class="fa-solid fa-house"></i>
                </a>
                <span class="text-sm text-gray-400">
                    <i class="fa-solid fa-chevron-right"></i>
                </span>
                <p class="text-gray-600 font-medium">Hesabım</p>
            </div>
            {loading && <Loading />}
            {!loading && order && <div class="container grid grid-cols-12 items-start gap-10 pt-4 pb-16">

                <div class="col-span-3">
                    <div class="px-4 py-3 shadow flex items-center gap-4">
                        <div class="flex-shrink-0">
                            <img src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png" alt="profile"
                                class="rounded-full w-14 h-14 border border-gray-200 p-1 object-cover" />
                        </div>
                        <div class="flex-grow">
                            <p class="text-gray-600">Merhaba,</p>
                            <h4 class="text-gray-800 font-medium">{data.name}</h4>
                        </div>
                    </div>

                    <div class="mt-6 bg-white shadow rounded p-4 divide-y divide-gray-200 space-y-4 text-gray-600">
                        <div class="space-y-1 pl-8">
                            <a href="#" class="relative text-primary block font-medium capitalize transition">
                                <span class="absolute -left-8 top-0 text-base">
                                    <i class="fa-regular fa-address-card"></i>
                                </span>
                                Hesap
                            </a>
                            <a href="#" class="relative hover:text-primary block capitalize transition">
                                Kişisel Bilgiler
                            </a>
                            <a href="#" class="relative hover:text-primary block capitalize transition">
                                Adresim
                            </a>
                            <a href="#" class="relative hover:text-primary block capitalize transition">
                                Puanlarım
                            </a>
                        </div>
                        <div class="space-y-1 pl-8 pt-4">
                            <a href="#" class="relative hover:text-primary block font-medium capitalize transition">
                                <span class="absolute -left-8 top-0 text-base">
                                    <i class="fa-regular fa-credit-card"></i>
                                </span>
                                Siparişlerim
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col-span-9 grid grid-cols-3 gap-12">
                    {
                        !open ? <>
                            <div class="shadow rounded bg-white px-4 pt-6 pb-8">
                                <div class="flex items-center justify-between mb-4">
                                    <h3 class="font-medium text-gray-800 text-lg">Kişisel Bilgiler</h3>
                                    <a onClick={() => setOpen(true)} class="text-primary">Düzenle</a>
                                </div>
                                <div class="space-y-1">
                                    <h4 class="text-gray-700 font-medium">{data.name}</h4>
                                    <p class="text-gray-800">{data.email}</p>
                                    <p class="text-gray-800">{data.phone}</p>
                                </div>
                            </div>

                            <div class="shadow rounded bg-white px-4 pt-6 pb-8">
                                <div class="flex items-center justify-between mb-4">
                                    <h3 class="font-medium text-gray-800 text-lg">Adres</h3>
                                    <a onClick={() => setOpen(true)} class="text-primary">Düzenle</a>
                                </div>
                                <div class="space-y-1">
                                    <h4 class="text-gray-700 font-medium">{data.address}</h4>
                                </div>
                            </div>

                            <div class="shadow rounded bg-white px-4 pt-6 pb-8">
                                <div class="flex items-center justify-between mb-4">
                                    <h3 class="font-medium text-gray-800 text-lg">Puan</h3>
                                </div>
                                <div class="space-y-1">
                                    <h4 class="text-gray-700 font-medium">{data.point} Puan</h4>
                                </div>
                            </div>
                        </>
                            : <form className='col-span-12' >
                                <div class="flex space-x-2 gap-8">
                                    <div className='w-1/2 flex flex-col gap-6'>
                                        <div>
                                            <label for="name" class="text-gray-600 mb-2 block">Ad Soyad</label>
                                            <input type="name" name="name" id="name"
                                                class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                                onChange={handleChange}
                                                placeholder="Ad Soyad" />
                                        </div>
                                        <div>
                                            <label for="phone" class="text-gray-600 mb-2 block">Telefon No</label>
                                            <input type="phone" name="phone" id="phone"
                                                class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                                onChange={handleChange}
                                                placeholder="Telefon No" />
                                        </div>
                                        <div>
                                            <label for="email" class="text-gray-600 mb-2 block">Email</label>
                                            <input type="email" name="email" id="email"
                                                class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                                onChange={handleChange}
                                                placeholder="email.@domain.com" />
                                        </div>
                                    </div>
                                    <div className='w-1/2 flex flex-col gap-6'>
                                        <div>
                                            <label for="address" class="text-gray-600 mb-2 block">Adres</label>
                                            <input type="address" name="address" id="address"
                                                class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                                onChange={handleChange}
                                                placeholder="Örn. Kocaeli" />
                                        </div>
                                        <div>
                                            <label for="password" class="text-gray-600 mb-2 block">Şifre</label>
                                            <input type="password" name="password" id="password"
                                                class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                                onChange={handleChange}
                                                placeholder="*******" />
                                        </div>
                                        <div>
                                            <label for="password2" class="text-gray-600 mb-2 block">Şifre</label>
                                            <input type="password" name="password2" id="password2"
                                                class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                                onChange={handleChange}
                                                placeholder="*******" />
                                        </div>
                                        <div class="mt-4 flex gap-10">
                                            <button type="button"
                                                onClick={handleClick}
                                                class="block w-1/2 py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">Güncelle</button>
                                            <button type="button"
                                                onClick={() => setOpen(false)}
                                                class="block w-1/2 py-2 text-center text-primary bg-transparent border border-primary rounded hover:bg-primary hover:text-primary transition uppercase font-roboto font-medium">Geri</button>
                                        </div>
                                    </div>



                                </div>

                            </form>
                    }


                    {
                        order.map((item) => (
                            <div class="col-span-4 shadow rounded bg-white px-4 pt-6 pb-8">
                                <div class="flex items-center justify-between mb-4">
                                    {item.status === "pending"
                                        ? <h3 class="font-medium text-orange-500 text-lg">Bekliyor - {item.total}₺</h3>
                                        : <h3 class="font-medium text-green-500 text-lg">Onaylandı - {item.total}₺</h3>}
                                </div>
                                <div class="space-y-1">
                                    {
                                        item.products.map((product) => (
                                            <h4 class="text-gray-700 font-medium">{product.name} - {product.price}₺ - {product.quantity} adet</h4>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }


                </div>
                <Toaster position='top-right'></Toaster>
            </div>}
            <Footer></Footer>
            <Copyright></Copyright>
        </>
    )
}

export default Account