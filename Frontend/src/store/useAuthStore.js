import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
// import { Logout } from "";

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    onlineUsers: [],
    // isLoadingProfileImage: false,


    checkAuth: async () => {
        try {
            const response = await axiosInstance.get("/auth/check");
            set({ authUser: response.data })




        } catch (error) {
            console.error("Error checking auth:", error);
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true })
        try {

            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully! Welcome to Baat-Cheet.");
        } catch (error) {
            // console.error("Error creating account:", error);
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }


    },
    login: async (data) => {
        set({ isLoggingIn: true })
        try {

            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged In successfully");
        } catch (error) {
            // console.error("Error creating account:", error);
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }


    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
        }
        catch (error) {
            toast.error("error logging out");
            console.log("Loggout error", error);
        }
    },
    updateProfile: async (data) => {
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.error("Error uploading profile image:", error);
            toast.error(error.response?.data?.message || "failed to upload profile image");
        }
    }
}));