import React from 'react';
import category1 from "../assets/images/category/category-1.jpg";
import category2 from "../assets/images/category/category-2.jpg";
import category3 from "../assets/images/category/category-3.jpg";
import category4 from "../assets/images/category/category-4.jpg";
import category5 from "../assets/images/category/category-5.jpg";
import category6 from "../assets/images/category/category-6.jpg";

const Categories = () => {

    return(
        <div class="container py-16">
        <h2 class="text-2xl font-medium text-gray-800 uppercase mb-6">Kategoriler</h2>
        <div class="grid grid-cols-3 gap-3">
            <div class="relative rounded-sm overflow-hidden group">
                <img src={category1} alt="category 1" class="w-full"/>
                <a href="#"
                    class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Kadın</a>
            </div>
            <div class="relative rounded-sm overflow-hidden group">
                <img src={category2} alt="category 1" class="w-full"/>
                <a href="#"
                    class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Erkek</a>
            </div>
            <div class="relative rounded-sm overflow-hidden group">
                <img src={category3} alt="category 1" class="w-full"/>
                <a href="#"
                    class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Kozmetik
                </a>
            </div>
            <div class="relative rounded-sm overflow-hidden group">
                <img src={category4} alt="category 1" class="w-full"/>
                <a href="#"
                    class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Teknoloji</a>
            </div>
            <div class="relative rounded-sm overflow-hidden group">
                <img src={category5} alt="category 1" class="w-full"/>
                <a href="#"
                    class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Ev ve Yaşam</a>
            </div>
            <div class="relative rounded-sm overflow-hidden group">
                <img src={category6} alt="category 1" class="w-full"/>
                <a href="#"
                    class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Spor</a>
            </div>
        </div>
    </div>
    );

}

export default Categories;