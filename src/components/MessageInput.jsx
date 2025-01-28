"use client"
import useChatStore from '@/store/useChatStore';
import { ImageIcon, ImagesIcon, Send, X } from 'lucide-react';
import React, { useState, useRef } from 'react'

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const fileInputRef = useRef(null);
    const { sentMessage } = useChatStore();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) return alert("Please select an image");
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setImagePreview(fileReader.result);
        };
        fileReader.readAsDataURL(file);
        // fileInputRef.current.value = "";
        // fileInputRef.current.files = null;
        // fileInputRef.current.blur();
        // setImagePreview(null);
    }

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    const handleSentMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return alert("Please enter a message or select an image");
        try {
           await sentMessage({
            text: text.trim(),
            image: imagePreview,
           })
           setText("");
           setImagePreview(null);
        } catch (error) {
            console.log(error);
            alert("Failed to send message");
        }
    }

    return (
        <div className='p-4 w-full'>
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
                            flex items-center justify-center"
                        // type="button"
                        >
                            <X className="size-4 p-[2px] bg-black text-white rounded-full" />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSentMessage} className='flex items-center gap-2'>
                <div className='flex-1 flex gap-2'>
                    <input
                        type='text'
                        placeholder='Type a message...'
                        className='w-full p-2 rounded-lg border border-zinc-700 bg-base-300'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <input
                        type='file'
                        accept='image/*'
                        className='hidden'
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                    <button
                        type="button"
                        className={`hidden sm:flex items-center justify-center btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <ImagesIcon size={20} />
                    </button>

                </div>
                <button
                    type="submit"
                    className={`btn btn-sm btn-circle ${!text.trim() && !imagePreview ? 'text-gray-400' : 'text-black'}`}
                    disabled={!text.trim() && !imagePreview}
                >
                    <Send size={22} />
                </button>
            </form>

        </div>
    )
}

export default MessageInput