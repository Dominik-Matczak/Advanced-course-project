import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBasketShopping, faUser, faArrowRightFromBracket, faMoon, faSun} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import { setFilterValue } from "../slices/filterSlice";
import { useFilteredProducts } from "../hooks/useFilteredProducts";
import { useDarkTheme } from "../hooks/useDarkTheme";
const  PageNavigation = () => {

    const { user, cart } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const { isDark, toggleTheme } = useDarkTheme();

      const {filters: {title}, } = useFilteredProducts();

    const handleSetFilterValue = (key, value) => {
      dispatch(setFilterValue({ key, value }));
  };

    return (
        <nav className="w-screen min-h-[50px] sm:h-[80px] md:h-[100px] bg-blue-700 shadow-lg absolute bottom-0 fixed sm:static sm:top-0 flex justify-center items-center sm:justify-around z-1">
            <div id="nav-logo" className="hidden sm:block">
                <Link to='/' > MultiShop </Link>
            </div>
            <div id="nav-searchbar">
                <label>
                    <input onChange={(e) => handleSetFilterValue('title', e.target.value)} value={title}type="text" name='search-bar' placeholder="Search for a product by name or category" className="text-sm p-3 bg-inherit rounded-lg hidden sm:block min-w-[100px] sm:min-w-[180px] md:min-w-[260px] lg:min-w-[500px]" /> 
                </label>
            </div>
            <ul id="nav-menu" className="flex gap-6 text-center text-sm justify-around w-screen sm:w-auto sm:gap-10">
            {user ? 
            <li>
                <Link to='/my-profile'>
                    <FontAwesomeIcon icon={faUser} size="2x"/>
                    <p className="hidden sm:block">Profile</p>
                </Link>
            </li> :
            <li>
                <Link to='/login'>
                    <FontAwesomeIcon icon={faUser} size="2x"/>
                    <p className="hidden sm:block">Sign in</p>
                </Link>
            </li>}
            <li>
                <Link to='/cart'>
                    <FontAwesomeIcon icon={faBasketShopping} size="2x"/>
                    {cart.length > 0 ? <p className="hidden sm:block">Cart [{cart.length}]</p> : <p className="hidden sm:block">Cart</p>}
                </Link>
            </li>
            {user &&
            <li onClick={() => dispatch(logout())}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} size='2x' />
                    <p className="hidden sm:block">Logout</p>
            </li>}
            <li className="hidden sm:block"><button onClick={toggleTheme}>{isDark ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}</button></li>
            </ul>
        </nav>
    );

}

export default PageNavigation;
