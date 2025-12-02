import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import ProductList from '../components/ProductList'
import PageNavigation from "../components/PageNavigation";

const MainPage = () => {
    const { token, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <>
            <PageNavigation />
            <ProductList />
        </>
    )
};

export default MainPage;