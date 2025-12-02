import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../slices/authSlice"
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect } from "react";

const Cart = () => {
  const { cart, user } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.orders);
  const { currentCartStage, handleProcced, handleReturn, register, errors, handleSubmit, onSubmit, isBtnDisabled } = useCart();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(orders)
  }, [orders])

  return (
    <div className="p-4">
      <Link to="/">Return to home page</Link>
      <h1 className="text-2xl mb-4">Welcome to Cart, current stage: {currentCartStage}</h1>
      
      {currentCartStage === 1 && 
      <ul>
        {cart.map((product, i) => (
          <li key={i} className="border p-2 mb-2">
            <img src={product.image} alt={product.title} className="h-16 inline-block mr-4" />
            {product.title} - ${product.price}
            <button className="ml-10 p-3 bg-red-500 text-white rounded-lg"onClick={() => dispatch(removeFromCart(i))}>Remove</button>
          </li>
        ))}
      </ul>}

      {currentCartStage === 2 && (
        user === null ? <Link to="/login">To continue, you need to login...</Link> :
        <form className="flex flex-col w-100 gap-2" onSubmit={handleSubmit(onSubmit)}>

    <TextField label="First name" {...register('firstname')} />
    {errors?.firstname && <p className="text-red-500">{errors.firstname.message}</p>}

    <TextField label="Last name" {...register('lastname')} />
    {errors?.lastname && <p className="text-red-500">{errors.lastname.message}</p>}

    <TextField label="Street" {...register('street')} />
    {errors?.street && <p className="text-red-500">{errors.street.message}</p>}

    <div className="flex gap-2">
      <TextField label="Zip Code" className="basis-[30%]" {...register('zipcode')} />
      <TextField label="City" className="basis-[70%]" {...register('city')} />
    </div>
    {errors?.zipcode && <p className="text-red-500">{errors.zipcode.message}</p>}
    {errors?.city && <p className="text-red-500">{errors.city.message}</p>}

    <TextField label="Phone number" {...register('phone')} />
    {errors?.phone && <p className="text-red-500">{errors.phone.message}</p>}

    <div className="mt-2">
      <FormControl fullWidth>
        <InputLabel id="payment-label">Payment Method</InputLabel>
        <Select
          labelId="payment-label"
          label="Payment Method"
          defaultValue=""
          {...register("paymentMethod", { required: "Please select a payment method" })}
        >
          <MenuItem value="traditional">Traditional Transfer</MenuItem>
        </Select>
      </FormControl>
      {errors?.paymentMethod && (
        <p className="text-red-500">{errors.paymentMethod.message}</p>
      )}
    </div>

    <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded-lg" disabled={!!isBtnDisabled}>
      Submit
    </button>
  </form>
)}

      {currentCartStage === 3 &&
      <div>
        <h1>Your order has been placed</h1>
        <h3>Once we notice a transfer from your data, order will be proceeded</h3>
      </div>
      }


      {currentCartStage > 1 && <button onClick={handleReturn}>return</button>}
      {currentCartStage < 2 && <button onClick={handleProcced}>procced</button>}
      
    </div>
  );
};

export default Cart;