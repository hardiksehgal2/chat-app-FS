"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

const Signup = () => {
    const router = useRouter();
    const {signup, isSigningUp} =  useAuthStore();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });
    
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = () => {
        const { fullName, email, password } = formData;
        if (!fullName || !email || !password) return false;
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await signup(formData);
            router.push('/'); // Redirect to home page after successful signup
        } catch (error) {
            // Error is already handled by the toast in the store
            console.log('Signup error:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center text-black justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
            <motion.div
                className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 w-full max-w-md"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h1
                    className="text-3xl font-bold text-gray-800 text-center mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Create Your Account
                </motion.h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Field */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <label className="block text-gray-600 mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            placeholder="Enter your fullName"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                            value={formData.fullName}
                            onChange={(e) =>
                                setFormData({ ...formData, fullName: e.target.value })
                            }
                        />
                    </motion.div>

                    {/* Email Field */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <label className="block text-gray-600 mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                        />
                    </motion.div>

                    {/* Password Field */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <label className="block text-gray-600 mb-1 font-medium">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        className={`w-full py-2 px-4 text-white font-bold rounded-lg shadow-md transition-all ${validateForm()
                                ? "bg-purple-500 hover:bg-purple-600 focus:ring-4 focus:ring-purple-300"
                                : "bg-gray-300 cursor-not-allowed"
                            }`}
                        disabled={!validateForm() || isSigningUp} // Disable the button if signing up
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        {isSigningUp ? (
                            <div className="flex items-center justify-center space-x-2">
                                <Loader className="animate-spin h-5 w-5" />
                                <span>Loading...</span>
                            </div>
                        ) : (
                            <span>{validateForm() ? "Sign Up" : "Complete the Form"}</span>
                        )}
                    </motion.button>

                </form>
                <motion.div
                    className="text-center text-sm text-gray-600 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    Already have an account?{" "}
                    <a href="/login" className="text-purple-500 font-medium hover:underline">
                        Log In
                    </a>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Signup;
