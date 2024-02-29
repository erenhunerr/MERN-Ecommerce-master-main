import React from 'react';
import sofa from "../assets/images/icons/sofa.svg";
import terrace from "../assets/images/icons/terrace.svg";
import bed from "../assets/images/icons/bed.svg";
import office from "../assets/images/icons/office.svg";
import outdoorCafe from "../assets/images/icons/outdoor-cafe.svg";
import bed2 from "../assets/images/icons/bed-2.svg";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem("user");
        dispatch(logout());
        navigate("/login");
    };

    const user = useSelector((state) => state.users.user);

    return (
        <nav class="bg-gray-800">
            <div class="container flex">
                {/* <div class="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
                <span class="text-white">
                    <i class="fa-solid fa-bars"></i>
                </span>
                <span class="capitalize ml-2 text-white hidden">All Categories</span>

                
                <div
                    class="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
                    <a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                        <img src={sofa} alt="sofa" class="w-5 h-5 object-contain"/>
                        <span class="ml-6 text-gray-600 text-sm">Sofa</span>
                    </a>
                    <a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                        <img src={terrace}  alt="terrace" class="w-5 h-5 object-contain"/>
                        <span class="ml-6 text-gray-600 text-sm">Terarce</span>
                    </a>
                    <a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                        <img src={bed}  alt="bed" class="w-5 h-5 object-contain"/>
                        <span class="ml-6 text-gray-600 text-sm">Bed</span>
                    </a>
                    <a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                        <img src={office}  alt="office" class="w-5 h-5 object-contain"/>
                        <span class="ml-6 text-gray-600 text-sm">office</span>
                    </a>
                    <a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                        <img src={outdoorCafe} alt="outdoor" class="w-5 h-5 object-contain"/>
                        <span class="ml-6 text-gray-600 text-sm">Outdoor</span>
                    </a>
                    <a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                        <img src={bed2} alt="Mattress" class="w-5 h-5 object-contain"/>
                        <span class="ml-6 text-gray-600 text-sm">Mattress</span>
                    </a>
                </div>
            </div> */}

                <div class="flex items-center justify-between flex-grow md:pl-12 py-5">
                    <div class="flex items-center space-x-6 capitalize">
                        <Link to="/" class="text-gray-200 hover:text-white transition">Ana Sayfa</Link>
                        <Link to="/shop" class="text-gray-200 hover:text-white transition">Ürünler</Link>
                        {
                            user &&
                            <Link to="/account" class="text-gray-200 hover:text-white transition">Hesabım</Link>
                        }
                    </div>
                    {
                        user ? (
                            <button onClick={handleLogout} class="text-gray-200 hover:text-white transition">Çıkış Yap</button>
                        ) : (
                            <Link to="/login" class="text-gray-200 hover:text-white transition">Giriş Yap</Link>
                        )
                    }
                </div>
            </div>
        </nav>
    );
}
export default Navbar;