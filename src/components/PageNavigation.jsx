import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBasketShopping, faUser, faBookmark, faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";

const  PageNavigation = () => {

    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    return (
        <nav className="w-screen min-h-[50px] sm:h-[80px] md:h-[100px] bg-orange-200 shadow-lg absolute bottom-0 sm:top-0 flex fixed justify-center items-center sm:justify-around">
            <div id="nav-logo" className="hidden sm:block">
                <span>MultiShop</span>
            </div>
            <div id="nav-searchbar">
                <label htmlFor="search-bar">
                    <input type="text" name='search-bar' placeholder="Search for a product by name or category" className="text-sm p-3 bg-white rounded-lg hidden sm:block min-w-[100px] sm:min-w-[180px] md:min-w-[260px] lg:min-w-[500px]" /> 
                </label>
            </div>
            <ul id="nav-menu" className="flex gap-6 text-center text-sm justify-around w-screen sm:w-auto sm:gap-10">
            <li>
                <Link to='/'>
                    <FontAwesomeIcon icon={faHouse} size="2x"/>
                    <p className="hidden sm:block">Homepage</p>
                </Link>
            </li>
            <li>
                <Link to='/'>
                    <FontAwesomeIcon icon={faBookmark} size="2x"/>
                    <p className="hidden sm:block">Favourites</p>
                </Link>
            </li>
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
                    <p className="hidden sm:block">Cart</p>
                </Link>
            </li>
            {user &&
            <li onClick={() => dispatch(logout())}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} size='2x' />
                    <p className="hidden sm:block">Logout</p>
            </li>}
            </ul>
        </nav>
    );

}

export default PageNavigation;
