import Cart from "./pages/Cart";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import OrderSuccess from "./pages/OrderSuccess";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DarkThemeProvider } from "./hooks/useDarkTheme";


const queryClient = new QueryClient();

export default function App() {

  return (
      <DarkThemeProvider>
        <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-profile" element={<MyProfile />} />
        </Routes>
      </QueryClientProvider>
      </DarkThemeProvider>
  );
}
