"use client";
import { create } from "zustand";
import axiosInstance from "@/lib/axios";
const useChatStore = create((set,get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true }); // Set loading state to true
    try {
      const res = await axiosInstance.get("/messages/users"); // Fetch users from API
      const { users } = res.data; // Ensure the response has a "users" field
      if (Array.isArray(users)) {
        set({ users }); // Update Zustand store
        console.log("Users in Zustand store:", users); // Debugging information
      } else {
        console.error("API did not return an array of users:", res.data);
        set({ users: [] }); // Fallback to empty array if response is not as expected
      }
    } catch (error) {
      console.error("Error fetching users:", error); // Log error for debugging
      set({ users: [] }); // Clear users in case of an error
    } finally {
      set({ isUsersLoading: false }); // Reset loading state
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.log("error in get messages:", error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sentMessage: async (messageData) => {
    const {selectedUser, messages} = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({messages: Array.isArray(messages) ? [...messages, res.data] : [res.data]});
    } catch (error) {
      console.log("error in sent message:", error);
    }
  },
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));

export default useChatStore;
