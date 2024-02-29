import React from "react";
import logo from "../assets/images/logo.svg";

const Footer = () => {

    return (
        <footer class="bg-white pt-16 pb-12 border-t border-gray-100">
        <div class="container grid grid-cols-1 ">
            <div class="col-span-1 space-y-4">
                <img src={logo} alt="logo" class="w-30"/>
                <div class="mr-2">
                    <p class="text-gray-500">
                      
                    </p>
                </div>
                
            </div>

            <div class="col-span-2 grid grid-cols-2 gap-4">
                <div class="grid grid-cols-2 gap-4 md:gap-8">
                    {/* <div>
                        <h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider">Kategoriler</h3>
                        <div class="mt-4 space-y-4">
                            <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Kadın</a>
                            <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Erkek</a>
                            <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Ev ve Yaşam</a>
                            <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Teknoloji</a>
                        </div>
                    </div> */}

                    <div>
                        <h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider">Kategoriler</h3>
                        <div class="mt-4 space-y-4">
                            <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Kadın</a>
                            <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Erkek</a> 
                            <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Ev ve Yaşam</a>
                            <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Teknoloji</a>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-8">
                    <div>
                        <h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider">Solutions</h3>
                        <div class="mt-4 space-y-4">
                            <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Marketing</a>
                            <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Analitycs</a>
                            <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Commerce</a>
                            <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Insights</a>
                        </div>
                    </div>

                    {/* <div>
                        <h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider">Support</h3>
                        <div class="mt-4 space-y-4">
                            <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Pricing</a>
                            <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Documentation</a> 
                            <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Guides</a>
                            <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">API Status</a>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    </footer>
    );

}


export default Footer;