import Cart from "./pages/Cart";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Navigation from "./compontents/Navigation";
import { Routes, Route } from "react-router-dom";

export default function App() {


  return (
    <Routes>
        <Route path='/' element={<MainPage />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/login' element={<Login />}></Route>
    </Routes>
  );
}
