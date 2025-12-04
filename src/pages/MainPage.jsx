import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import ProductList from '../components/ProductList'
import FilterProducts from "../components/FilterProducts";
import PageNavigation from "../components/PageNavigation";
import { Container, Box, Drawer } from '@mui/material';


const MainPage = () => {
    const { token, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <>
            <Box>
                <PageNavigation />
                <Container  className="flex flex-col md:flex-row gap-5">
                    <FilterProducts/>
                    <ProductList/>
                </Container>
            </Box>
        </>
    )
};

export default MainPage;