import axiosInstance from "@/lib/axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";

const useAuthStore = create((set) => ({
  authUser: null, // Variable to store the authenticated user's data
  isSigningUp: false, // Tracks if the signup process is in progress
  isLoggingIn: false, // Tracks if the login process is in progress
  isCheckingAuth: true, // Tracks if we are currently checking the user's authentication status
  isUpdatingProfile: false, 
  onlineUsers: [],
  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check"); // Call the backend API to check if the user is logged in
      set({ authUser: response.data, isCheckingAuth: false }); // Update authUser with the API response and set isCheckingAuth to false
    } catch (error) {
      set({ authUser: null, isCheckingAuth: false }); // If there's an error, set authUser to null and stop checking
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true }); // Indicate that the signup process has started
    try {
      const response = await axiosInstance.post("/auth/signup", data); // Call the backend API to sign up the user
      set({ authUser: response.data, isSigningUp: false }); // Update authUser with the new user's data and stop the signup process
      toast.success("Successfully signed up!"); // Show a success message
    } catch (error) {
      set({ isSigningUp: false }); // Stop the signup process if there's an error
      toast.error(error.response?.data?.message || "Failed to sign up"); // Show an error message
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout"); // Call the backend API to log out the user
      set({ authUser: null }); // Reset authUser and start checking authentication status
      toast.success("Successfully logged out!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out");
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response.data, isLoggingIn: false });
    } catch (error) {
      set({ isLoggingIn: false });
      toast.error(error.response?.data?.message || "Failed to log in");
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      console.log("Successfully updated profile");
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));

export default useAuthStore;
