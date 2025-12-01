import { useSelector } from "react-redux";


const Cart = () => {

    const { cart } = useSelector((state) => state.auth)

    return <div>Welcome to Cart
        {cart.map((p) => {
            return <li>{p}</li>
        })}
    </div>;

};

export default Cart;