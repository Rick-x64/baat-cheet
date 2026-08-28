import { create } from "zustand";

export const useAuthStore = create((set) => ({
    authUser: { name: "John Doe", id: "123", age: 30 },
    isLoggedIn: false,

    login: () => {
        console.log("We just logged in!")
        set({ isLoggedIn: true, isLoading: true });
    },

}))