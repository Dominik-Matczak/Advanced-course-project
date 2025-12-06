import { useEffect, useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addNewOrder } from "../slices/orderSlice";
import { clearCart } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

const useCart = () => {
  const [currentCartStage, setCurrentCartStage] = useState(1);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.auth.cart);
  const user = useSelector((state) => state.auth.user);
  const { orders } = useSelector((state) => state.orders)
  const navigate = useNavigate();

const handleProcced = async() => {
    if (cart.length !== 0) {
      setCurrentCartStage(currentCartStage + 1)
    } 
};

  const handleReturn = () => {
    if (currentCartStage > 1) {
      setCurrentCartStage(currentCartStage - 1);
    }
  };

  useEffect(() => {
    console.log(orders)
  },[orders])

  const orderSchema = z.object({
    firstname: z.string().min(5, "Name is too short"),
    lastname: z.string().min(6, "Last name is too short"),
    city: z.string().min(3, "City name is invalid"),
    street: z.string().min(6, "Street's data is invalid"),
    zipcode: z.string().regex(/^\d{5}-\d{4}$/, {
      message: "Invalid zip-code, Check format XX-XXX",
    }),
    phone: z
      .string()
      .regex(/^[0-9]-\d{3}-\d{3}-\d{4}$/, {
        message: "Phone number must contain 9 digits",
      }),
    paymentMethod: z.enum(["traditional"], {
    errorMap: () => ({ message: "Please select a payment method" }),
  }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      firstname: user?.name?.firstname,
      lastname: user?.name?.lastname,
      street: user?.address?.street,
      zipcode: user?.address?.zipcode,
      city: user?.address?.city,
      phone: user?.phone
    }
  });

  const onSubmit = (data) => {
    setIsBtnDisabled(true);
    dispatch(addNewOrder({
        customer: data,
        cart,
        user
    }))
    setTimeout(() => {
        setIsBtnDisabled(false);
        dispatch(clearCart())
        navigate('/order-success')
    }, 1200)
  };

  return {
    currentCartStage,
    setCurrentCartStage,
    handleProcced,
    handleReturn,
    register,
    handleSubmit,
    errors,
    onSubmit,
    isBtnDisabled
  };
};

export default useCart;
