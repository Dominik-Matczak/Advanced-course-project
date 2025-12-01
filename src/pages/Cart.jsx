import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../slices/authSlice"

const Cart = () => {
  const { cart } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Welcome to Cart</h1>
      <ul>
        {cart.map((product, i) => (
          <li key={i} className="border p-2 mb-2">
            <img src={product.image} alt={product.title} className="h-16 inline-block mr-4" />
            {product.title} - ${product.price}
            <button className="ml-10 p-3"onClick={() => dispatch(removeFromCart(i))}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;