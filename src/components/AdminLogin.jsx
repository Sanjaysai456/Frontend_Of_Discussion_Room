import React, { useState } from "react";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserShield, FaLock, FaSignInAlt } from "react-icons/fa";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/admin/login", { username, password });
      const token = res.data.token;
      localStorage.setItem("adminToken", token);
      setError("");
      navigate("/admin-dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <motion.form
          onSubmit={handleLogin}
          className="bg-white backdrop-blur-lg bg-opacity-90 p-10 rounded-3xl shadow-2xl"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="flex items-center justify-center mb-8"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
          >
            <FaUserShield className="text-5xl text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Admin Login
            </h2>
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-3 bg-red-100 text-red-600 rounded-lg text-center font-medium"
            >
              {error}
            </motion.p>
          )}

          <motion.div
            className="mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center bg-gray-50 rounded-lg px-4 border border-gray-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-300">
              <FaUserShield className="text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full p-3 bg-transparent outline-none ml-2"
                required
              />
            </div>
          </motion.div>

          <motion.div
            className="mb-8"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center bg-gray-50 rounded-lg px-4 border border-gray-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-300">
              <FaLock className="text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full p-3 bg-transparent outline-none ml-2"
                required
              />
            </div>
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FaSignInAlt />
            <span>Login to Dashboard</span>
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
