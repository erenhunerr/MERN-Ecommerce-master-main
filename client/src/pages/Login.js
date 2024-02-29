import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Toaster, toast } from "react-hot-toast";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Copyright from "../components/Copyright";

function Login() {
  const [user, setUser] = useState({
    email: undefined,
    password: undefined,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    console.log(user);
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/auth/login", user);
      const decoded = jwtDecode(res.data.token);
      localStorage.setItem("user", JSON.stringify(decoded.user));
      dispatch(login(decoded.user));
      navigate("/");
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
          <h2 class="text-2xl uppercase font-medium mb-1">Giriş Yap</h2>
          <p class="text-gray-600 mb-6 text-sm">
            Hoşgeldiniz, lütfen giriş yapın.
          </p>
          <form >
            <div class="space-y-2">
              <div>
                <label for="email" class="text-gray-600 mb-2 block">Email</label>
                <input type="email" name="email" id="email"
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  onChange={handleChange}
                  placeholder="email.@domain.com" />
              </div>
              <div>
                <label for="password" class="text-gray-600 mb-2 block">Şifre</label>
                <input type="password" name="password" id="password"
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  onChange={handleChange}
                  placeholder="*******" />
              </div>
            </div>
            {/* <div class="flex items-center justify-between mt-6">
              <div class="flex items-center">
                <input type="checkbox" name="remember" id="remember"
                  class="text-primary focus:ring-0 rounded-sm cursor-pointer" />
                <label for="remember" class="text-gray-600 ml-3 cursor-pointer">Beni hatırla</label>
              </div>
              <a href="#" class="text-primary">Şifremi unuttum</a>
            </div> */}
            <div class="mt-4">
              <button type="button"
                onClick={handleClick}
                class="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">Giriş Yap</button>
            </div>
          </form>

          {/* <div class="mt-6 flex justify-center relative">
            <div class="text-gray-600 uppercase px-3 bg-white z-10 relative">Or login with</div>
            <div class="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
          </div>
          <div class="mt-4 flex gap-4">
            <a href="#"
              class="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700">facebook</a>
            <a href="#"
              class="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500">google</a>
          </div> */}

          <p class="mt-4 text-center text-gray-600">Hesabınız yok mu? <Link to="/register"
            class="text-primary">Şimdi Kayıt Ol</Link></p>
        </div>
        <Toaster position="top-right" />
      </div>
      <Footer></Footer>
      <Copyright></Copyright>
    </>

    // <div>
    //   <form>
    //     <label>
    //       Email:
    //       <input type="email" name="email" id="email" onChange={handleChange} />
    //     </label>
    //     <label>
    //       Password:
    //       <input
    //         type="text"
    //         name="password"
    //         id="password"
    //         onChange={handleChange}
    //       />
    //     </label>
    //     <button onClick={handleClick} type="button">
    //       Giriş Yap
    //     </button>
    //   </form>
    //   <Toaster position="top-right" />
    // </div>
  );
}

export default Login;
