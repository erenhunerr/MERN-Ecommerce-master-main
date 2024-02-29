import React from 'react';
import "../main.css";
import bannerBg from "../assets/images/banner-bg.jpg";

const Banner = () => {
    const backgroundStyle = {
        backgroundImage: `url(${bannerBg})`,
        backgroundSize: 'cover',
    };

    return (
        <div class="bg-cover bg-no-repeat bg-center py-36" style={backgroundStyle}>
            <div class="container">
                <h1 class="text-6xl text-gray-800 font-medium mb-4 capitalize">
                En Yeni Trendleri Keşfedin! <br /> İhtiyacınız Olan Her Şey Burada!
                </h1>
                <p>Alışverişinizi daha keyifli ve özel hale getirmek için burada! Yepyeni kampanyalar, en son trendler ve sizi bekleyen birçok sürprizle dolu bir alışveriş deneyimi sizi bekliyor.</p>
                <div class="mt-12">
                    <a href="#" class="bg-primary border border-primary text-white px-8 py-3 font-medium 
                    rounded-md hover:bg-transparent hover:text-primary">Alışverişe Başla</a>
                </div>
            </div>
        </div>

    );


}


export default Banner;