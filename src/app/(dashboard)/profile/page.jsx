"use client";
import { useState, useEffect } from "react";
// import useAuthStore  from "../store/useAuthStore";
import useAuthStore from '@/store/useAuthStore';

import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    console.log("Current authUser data:", authUser);
  }, [authUser]);

  // Access the user data from authUser.user
  const userData = authUser?.user || {};
 
  const handleImageUpload = async (e) => {
    // 1. Get the file from the input
    const file = e.target.files[0];  // This gets the first file selected
    if (!file) return;

    // 2. Create a new FileReader instance
    const reader = new FileReader();

    // 3. Start reading the file as a base64 string
    reader.readAsDataURL(file);

    // 4. When the reading is complete, this event handler runs
    reader.onload = async () => {
        // reader.result contains the base64 string representation of the image
        const base64Image = reader.result;
        // Example base64 string: "data:image/jpeg;base64,/9j/4AAQSkZJRg..."

        // 5. Set the preview image
        setSelectedImg(base64Image);

        // 6. Send to server
        await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-white text-black rounded-xl p-8 space-y-8 shadow-sm">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-800">Profile</h1>
            <p className="mt-2 text-gray-600">Your profile information</p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || userData.profilePicture || "/globe.svg"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-2 border-gray-200"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-white hover:bg-gray-50
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  border border-gray-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-gray-600" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-gray-500">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <input
                type="text"
                value={userData.fullName || ''}
                readOnly
                className="w-full px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200 text-gray-800"
              />
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <input
                type="email"
                value={userData.email || ''}
                readOnly
                className="w-full px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200 text-gray-800"
              />
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Member Since</span>
                <span className="text-gray-800">
                  {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : ''}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>

          {/* Debug section - you can remove this in production */}
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <pre className="text-xs overflow-auto">
              {JSON.stringify(authUser, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;