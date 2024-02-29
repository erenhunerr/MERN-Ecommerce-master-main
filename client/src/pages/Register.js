import React, { useState } from 'react'
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Copyright from "../components/Copyright";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [user, setUser] = useState({
    name: undefined,
    email: undefined,
    phone: undefined,
    password: undefined,
    password2: undefined,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (user.password == user.password2) {
        await axios.post("http://localhost:3001/auth/register", user);
        navigate("/login");
      }
      else {
        toast.error("Şifreler uyuşmuyor");
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  return (
    <>
      <Header></Header>
      <Navbar></Navbar>
      <div class="contain py-16">
        <div class="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 class="text-2xl uppercase font-medium mb-1">Yeni hesap oluştur</h2>
          <p class="text-gray-600 mb-6 text-sm">
            Yeni müşteri için kaydolun
          </p>
          <form action="#" method="post" autocomplete="off">
            <div class="space-y-2">
              <div>
                <label for="name" class="text-gray-600 mb-2 block">Ad Soyad</label>
                <input type="text" name="name" id="name"
                  onChange={handleChange}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="fulan fulana" />
              </div>
              <div>
                <label for="phone" class="text-gray-600 mb-2 block">Telefon No</label>
                <input type="text" name="phone" id="phone"
                  onChange={handleChange}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="fulan fulana" />
              </div>
              <div>
                <label for="email" class="text-gray-600 mb-2 block">Email</label>
                <input type="email" name="email" id="email"
                  onChange={handleChange}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="youremail.@domain.com" />
              </div>
              <div>
                <label for="password" class="text-gray-600 mb-2 block">Şifre</label>
                <input type="password" name="password" id="password"
                  onChange={handleChange}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="*******" />
              </div>
              <div>
                <label for="password2" class="text-gray-600 mb-2 block">Şifre Tekrar</label>
                <input type="password" name="password2" id="password2"
                  onChange={handleChange}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="*******" />
              </div>
            </div>
            {/* <div class="mt-6">
              <div class="flex items-center">
                <input type="checkbox" name="aggrement" id="aggrement"
                  class="text-primary focus:ring-0 rounded-sm cursor-pointer" />
                <label for="aggrement" class="text-gray-600 ml-3 cursor-pointer">Okudum ve onaylıyorum <a
                  href="#" class="text-primary">şartlar ve koşullar</a></label>
              </div>
            </div> */}
            <div class="mt-4">
              <button type="button"
                onClick={handleClick}
                class="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">Üye Ol</button>
            </div>
          </form>
          <p class="mt-4 text-center text-gray-600">Hesabınız var mı?<Link to="/login"
            class="text-primary"> Giriş Yap</Link></p>
        </div>
        <Toaster position="top-right" />

      </div>
      <Footer></Footer>
      <Copyright></Copyright>
    </>
  )
}

export default Register