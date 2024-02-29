
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import AddProducts from "./pages/Admin/Product/AddProducts";
import Account from "./pages/Account";
import Checkout from "./pages/Checkout";
import Shop from "./pages/Shop";
import Wishlist from "./pages/Wishlist";
import Dashboard from "./pages/Admin/Dashboard";
import Users from "./pages/Admin/User/Users";
import Products from "./pages/Admin/Product/Products";
import AddProductIndex from "./pages/Admin/Product/AddProductIndex";
import Basket from "./pages/Basket";
import Details from "./pages/Details";

function App() {
  const user = useSelector((state) => state.users.user);

  return (
    <Router>
      {/* <Header/> */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/account" element={<Account />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/details/:id" element={<Details />}></Route>
        <Route path="/wishlist" element={<Wishlist />}></Route>
        <Route path="/dashboard" element={user.role === "user" ? <Home /> : <Dashboard />}></Route>
        <Route path="/users" element={!user ? <Home /> : <Users />}></Route>
        <Route path="/products" element={!user ? <Home /> : <Products />}></Route>
        <Route path="/add-products" element={!user ? <Home /> : <AddProductIndex />}></Route>
        <Route path="/basket/:id" element={!user ? <Home /> : <Basket />}></Route>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        ></Route>
      </Routes>
      {/* <Footer/> */}
    </Router>
  );
}

export default App;
