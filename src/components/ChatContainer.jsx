import useChatStore from '@/store/useChatStore'
import React, { useEffect } from 'react'
import MessageSkeleton from './skeletons/MessageSkeleton';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import useAuthStore from '@/store/useAuthStore';

const ChatContainer = () => {
  const { messages, selectedUser, isMessagesLoading, getMessages } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser, getMessages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }


  return (
    <div className='flex-1 overflow-auto flex flex-col'>
      <ChatHeader />
      <div className='flex flex-1 overflow-y-auto flex-col space-y-4 p-4'>
        {Array.isArray(messages) && messages.map((message) => (
          <div 
            key={message._id} 
            className={`flex items-center gap-2 ${message.senderId === authUser?._id ? "flex-row-reverse" : ""}`}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src={message.senderId === authUser?._id 
                  ? (authUser?.profilePic || "/globe.svg") 
                  : (selectedUser?.profilePic || "/globe.svg")} 
                alt="profile" 
                className='w-full h-full object-cover'
              />
            </div>
            <div className={`max-w-[75%] flex flex-col gap-2 ${
              message.senderId === authUser?._id 
                ? "items-end" 
                : "items-start"
            }`}>
              <div className={`rounded-2xl p-3 ${
                message.senderId === authUser?._id 
                  ? "bg-blue-500 text-white rounded-tr-none" 
                  : "bg-gray-200 text-gray-800 rounded-tl-none"
              }`}>
                <p>{message.text}</p>
              </div>
              {message.image && (
                <img 
                  src={message.image} 
                  alt="message" 
                  className='max-w-[200px] rounded-lg'
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />

    </div>
  )
}

export default ChatContainer