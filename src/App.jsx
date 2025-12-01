import Cart from "./pages/Cart";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<MainPage />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </QueryClientProvider>
    
  );
}
