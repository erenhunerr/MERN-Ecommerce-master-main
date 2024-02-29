import React from "react";
import methods from "../assets/images/methods.png";

const Footer = () => {

    return (
        <div>
            <div class="bg-gray-800 py-4">
                <div class="container flex items-center justify-between">
                    <p class="text-white">&copy; TailCommerce - Tüm hakları saklıdır.</p>
                    {/* <div>
                        <img src={methods} alt="methods" class="h-5" />
                    </div> */}
                </div>
            </div>
        </div>
    );

}


export default Footer;