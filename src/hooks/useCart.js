import { useEffect, useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addNewOrder } from "../slices/orderSlice";
import { clearCart } from "../slices/authSlice";

const useCart = () => {
  const [currentCartStage, setCurrentCartStage] = useState(1);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.auth.cart);
  const user = useSelector((state) => state.auth.user);
  const { orders } = useSelector((state) => state.orders)

  const handleProcced = async() => {
    if (cart.length === 0) {
        return;
    }
    if (currentCartStage === 2) {
        const isValid = await trigger();
        if (!isValid) return;
    } else {
        setCurrentCartStage(currentCartStage + 1);
    }
    if (currentCartStage < 3) {
      setCurrentCartStage(currentCartStage + 1);
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
    zipcode: z.string().regex(/^\d{2}-\d{3}$/, {
      message: "Invalid zip-code, Check format XX-XXX",
    }),
    phone: z
      .string()
      .regex(/^[0-9]{9}$/, {
        message: "Phone number must contain 9 digits",
      })
      .max(9, "Phone number is too long"),
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
  });

  const onSubmit = (data) => {
    setIsBtnDisabled(true);
    dispatch(addNewOrder({
        customer: data,
        cart,
        user
    }))
    setTimeout(() => {
        setCurrentCartStage(currentCartStage + 1);
        setIsBtnDisabled(false);
        dispatch(clearCart())
    }, 1200)
  };

  return {
    currentCartStage,
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
