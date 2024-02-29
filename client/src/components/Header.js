import React from 'react';
import logo from "../assets/images/yeniLogo.jpeg";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useFetch from '../hooks/useFetch';

const Header = () => {
    const user = useSelector((state) => state.users.user);
    const { data, loading, error } = useFetch(`/basket/getBasket/${user._id}`);
    return (
        <div>
            <header class="py-4 shadow-sm bg-white">
                <div class="container flex items-center justify-between">
                    <Link to="/">
                        <img src={logo} alt="Logo" class="w-48" />
                    </Link>

                    <div class="w-full max-w-xl relative flex">
                        <span class="absolute left-4 top-3 text-lg text-gray-400">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </span>
                        <input type="text" name="search" id="search"
                            class="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex"
                            placeholder="Arama Yap" />
                        <button class="flex items-center justify-center bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition hidden md:flex">
                            Ara
                        </button>

                    </div>

                    <div class="flex items-center space-x-4">
                        {
                            user.role === "admin" && <Link to="/dashboard" class="text-center text-gray-700 hover:text-primary transition relative">
                                <div class="text-2xl">
                                    <i class="fa-solid fa-user-tie"></i>
                                </div>
                                <div class="text-xs leading-3">Admin</div>
                            </Link>
                        }
                        {
                            user && <>

                                <Link to={`/basket/${user._id}`} class="text-center text-gray-700 hover:text-primary transition relative">
                                    <div class="text-2xl">
                                        <i class="fa-solid fa-bag-shopping"></i>
                                    </div>
                                    <div class="text-xs leading-3">Sepet</div>
                                    <div
                                        class="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                                        {data?.products?.length > 0 && data.products.length}</div>
                                </Link>
                                <Link to="/account" class="text-center text-gray-700 hover:text-primary transition relative">

                                    <div class="text-2xl">
                                        <i class="fa-regular fa-user"></i>
                                    </div>
                                    <div class="text-xs leading-3">Hesabım</div>
                                </Link>
                            </>
                        }

                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;