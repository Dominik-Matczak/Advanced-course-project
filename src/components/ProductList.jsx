import { useProducts } from "../hooks/useProducts";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/authSlice"

const ProductsList = () => {
  const { data: products, isLoading, error } = useProducts();
  const dispatch = useDispatch();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="grid grid-cols-1 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded">
          <img src={product.image} className="h-40 mx-auto" />
          <h3>{product.title}</h3>
          <p>${product.price}</p>
          <button
            onClick={() => dispatch(addToCart(product))}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
          >
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
