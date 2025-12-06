import { TextField, Button, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const { register, handleSubmit, errors, onSubmit, dispatch } = useLogin();
  const { error, status, token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

    useEffect(() => {
        if (status === "succeeded" && token && user) {
            navigate(-1); // strona główna
        }
    }, [status, token, user, navigate]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center justify-center h-screen"
    >
      <Box
        component="div"
        className="p-10 w-120 flex flex-col rounded-lg shadow-2xl gap-5"
      >
        <Typography variant="h5" component="h1" textAlign="center" gutterBottom>
          Use your data to log in
        </Typography>

        <TextField
          label="Username"
          type="username"
          {...register("username")}
          error={!!errors.username}
          helperText={errors.username ? errors.username.message : ""}
          fullWidth
        />

        <TextField
          label="Password"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ""}
          fullWidth
        />

        <Button type="submit" disabled={status === 'loading'} variant="contained" color="primary" className="self-center mt-4">
          Log in
        </Button>
        {error && (
            <p className="text-red-600 text-center mt-2">{error}</p>
        )}
      </Box>
    </form>
  );
};

export default Login;
