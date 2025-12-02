import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useDispatch, useSelector} from "react-redux";
import { loginUser } from "../slices/authSlice";

const useLogin = () => {

  const dispatch = useDispatch();

  const onSubmit = (userData) => {
    dispatch(loginUser(userData))

  };
    const loginSchema = z.object({
  username: z
    .string()
    .min(5, "Username is too short"),
  password: z
    .string()
    .min(6, "Password is too short [6+]"),
});

const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });


  return { register, handleSubmit, errors, onSubmit, dispatch}
}

export default useLogin;