"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';
import { FiSettings } from 'react-icons/fi';
import useAuthStore from "@/store/useAuthStore";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { authUser, logout } = useAuthStore();

  // Add this console log to check the value
  // console.log('authUser in Navbar:', authUser);

  // Control navbar visibility on scroll
  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY) { // scrolling down
        setShow(false);
      } else { // scrolling up
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <motion.nav 
      initial={{ y: 0 }}
      animate={{ y: show ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed w-full top-0 z-50 bg-white text-black shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold">
              Chat
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <FiSettings className="w-6 h-6 cursor-pointer hover:text-gray-600" />
            {authUser ? (
              <>
                <Link href="/profile" className="hover:text-gray-600">
                  Profile
                </Link>
                <button onClick={logout} className="hover:text-gray-600">
                  Logout
                </button>
              </>
            ) : null}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-gray-600"
            >
              {isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
              <div className="flex flex-col items-center space-y-2">
                <FiSettings className="w-6 h-6 cursor-pointer hover:text-gray-600" />
                {authUser ? (
                  <>
                    <Link 
                      href="/profile" 
                      className="block px-3 py-2 hover:text-gray-600 w-full text-center"
                    >
                      Profile
                    </Link>
                    <button 
                      onClick={logout}
                      className="block px-3 py-2 hover:text-gray-600 w-full"
                    >
                      Logout
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;