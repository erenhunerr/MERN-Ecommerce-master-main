import React from 'react';
import deliveryVan from "../assets/images/icons/delivery-van.svg";
import moneyBack from "../assets/images/icons/money-back.svg";
import serviceHours from "../assets/images/icons/service-hours.svg";

const Banner = () => {

    return(
        <div class="container py-16">
        <div class="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center">
            <div class="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
                <img src={deliveryVan} alt="Delivery" class="w-12 h-12 object-contain"/>
                <div>
                    <h4 class="font-medium capitalize text-lg">Ücretsiz Teslimat</h4>
                    <p class="text-gray-500 text-sm">2000 TL üstü alışverişlerinizde</p>
                </div>
            </div>
            <div class="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
                <img src={moneyBack} alt="Delivery" class="w-12 h-12 object-contain"/>
                <div>
                    <h4 class="font-medium capitalize text-lg">Para İadesi</h4>
                    <p class="text-gray-500 text-sm">30 gün içerisinde</p>
                </div>
            </div>
            <div class="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
                <img src={serviceHours} alt="Delivery" class="w-12 h-12 object-contain"/>
                <div>
                    <h4 class="font-medium capitalize text-lg">24/7 Destek</h4>
                    <p class="text-gray-500 text-sm">Müşteri Desteği</p>
                </div>
            </div>
        </div>
    </div>
    );

}


export default Banner;