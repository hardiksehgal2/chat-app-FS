"use client";
import ChatContainer from "@/components/ChatContainer";
import Navbar from "@/components/navbar";
import NoChatSelected from "@/components/NoChatSelected";
import Sidebar from "@/components/sidebar";
import useChatStore from "@/store/useChatStore";
import React, { useEffect } from "react";

const Page = () => {
  const { getUsers, selectedUser } = useChatStore();
  return (
    <>
      <Navbar />
      <div className="h-screen bg-slate-200">
        <div className="flex items-center justify-center pt-20 px-4">
          <div className="bg-slate-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)] ">
            <div className="flex h-full rounded-lg overflow-hidden">
              <Sidebar />
            {selectedUser ? <ChatContainer /> : <NoChatSelected />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
