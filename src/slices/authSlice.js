import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const loginRes = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!loginRes.ok) throw new Error("Invalid login credentials");
      const { token } = await loginRes.json();
      const usersRes = await fetch("https://fakestoreapi.com/users");
      const users = await usersRes.json();
      const foundUser = users.find((u) => u.username === username);
      if (!foundUser) throw new Error("User not found");
      const cartRes = await fetch(
        `https://fakestoreapi.com/carts/user/${foundUser.id}`
      );
      const cart = await cartRes.json();
      console.log(token, foundUser, cart);
      return {
        token,
        user: foundUser,
        cart,
      };
    } catch (err) {
      return rejectWithValue("Wrong username or password");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.cart = [];
      state.user = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.cart = action.payload.cart;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("cart", JSON.stringify(action.payload.cart));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
