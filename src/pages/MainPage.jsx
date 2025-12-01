import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import ProductList from '../components/ProductList'


const MainPage = () => {
    const { token, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(localStorage)
    }, [])

    return (
        <>
            <div id="navigation" className="flex justify-between p-10 bg-gray-200 text-sm shadow-lg">
                <div id="logo">logo-placeholder</div>
                <div id="search-bar">searchbar-ph</div>
                <ul id="navigation-user-actions" className="flex gap-5">
                    <li>Home</li>
                    <li>Contact</li>
                    {token ? (<li onClick={() => dispatch(logout())} className="cursor-pointer">Logout</li>) : (<li><Link to="/login">Login</Link></li>)}
                    <li><Link to="/cart">Cart</Link></li>
                </ul>
            </div>
            <ProductList />
        </>
    )
};

export default MainPage;