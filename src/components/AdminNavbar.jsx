import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserShield, FaBookmark, FaHistory, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-4 flex justify-between items-center shadow-lg"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-2"
      >
        <FaUserShield className="text-2xl text-blue-400" />
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Admin Panel
        </h1>
      </motion.div>

      <div className="flex items-center gap-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative group"
        >
          <Link 
            to="/admin-dashboard" 
            className="flex items-center gap-2 hover:text-blue-400 transition-colors duration-300"
          >
            <FaBookmark />
            <span>Bookings</span>
          </Link>
          <div className="absolute h-0.5 w-0 bg-blue-400 group-hover:w-full transition-all duration-300" />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative group"
        >
          <Link 
            to="/admin-history" 
            className="flex items-center gap-2 hover:text-blue-400 transition-colors duration-300"
          >
            <FaHistory />
            <span>History</span>
          </Link>
          <div className="absolute h-0.5 w-0 bg-blue-400 group-hover:w-full transition-all duration-300" />
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default AdminNavbar;
