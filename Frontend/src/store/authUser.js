import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/users/signup", credentials);
      set({ user: response.data.data.user, isSigningUp: false });
      toast.success("Signup successfully");
    } catch (err) {
      toast.error(err.response.data.message || "Sign Up failed");
      set({ isSigningUp: false, user: null });
    }
  },
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/v1/users/signIn", credentials);
      set({ user: response.data.data.user, isLoggingIn: false });
      toast.success("Login successfully");
    } catch (err) {
      toast.error(err.response.data.message || "Login failed");
      set({ isLoggingIn: false, user: null });
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/users/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Log out successfully");
    } catch (err) {
      toast.error(err.response.data.message || "An error occupied");
      set({ isLoggingOut: false });
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/users/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (err) {
      //toast.error(err.response.data.message || "An error occupied");
      set({ isCheckingAuth: false, user: null });
    }
  },
}));
