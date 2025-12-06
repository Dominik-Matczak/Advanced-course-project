import { useProducts } from "../hooks/useProducts";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/authSlice"
import { Paper } from "@mui/material";
import { useFilteredProducts } from "../hooks/useFilteredProducts";

const ProductsList = () => {
  const { isLoading, error } = useProducts();
  const { filteredProducts } = useFilteredProducts();
  const dispatch = useDispatch();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="w-[100%] mt-[30px] grid lg:grid-cols-3 md:grid-cols-2 gap-5">
      {filteredProducts.map((product) => (
        <Paper key={product.id} elevation={4} className="w-[100%] p-5 mx-1 flex flex-col group">
          <img src={product.image} className="h-40 w-30 md:w-30 mx-auto" />
          <h2 className="group-hover:hidden self-end">{product.title}</h2>
          <span className="group-hover:block hidden">{product.description}</span>
          <p className="self-end">${product.price}</p>
          <button
            onClick={() => dispatch(addToCart(product))}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2 self-end"
          >
            Add to cart
          </button>
        </Paper>
      ))}
    </div>
  );
};

export default ProductsList;
