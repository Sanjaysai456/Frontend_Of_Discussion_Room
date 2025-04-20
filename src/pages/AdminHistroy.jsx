import React, { useEffect, useState } from "react";
import API from "../services/api";
import AdminNavbar from "../components/AdminNavbar";
import { motion } from "framer-motion";
import { FaHistory, FaUser, FaCalendarAlt, FaClock, FaDoorOpen, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const AdminHistory = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get("/bookings");
      setBookings(res.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <AdminNavbar />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto my-10 p-8 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl"
      >
        <motion.h1 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-4xl font-bold text-center mb-10 flex items-center justify-center gap-3"
        >
          <FaHistory className="text-blue-500 animate-spin-slow" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Booking History
          </span>
        </motion.h1>

        {bookings
          .filter(
            (b) =>
              b.status.toLowerCase() === "approved" ||
              b.status.toLowerCase() === "rejected"
          )
          .map((booking, index) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              key={booking._id}
              className="border border-gray-200 p-6 rounded-2xl mb-6 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white backdrop-blur-lg"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <motion.p whileHover={{ scale: 1.02 }} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
                  <FaUser className="text-blue-500" />
                  <strong className="text-blue-600">Leader Name:</strong> {booking.leaderName}
                </motion.p>
                
                <motion.p whileHover={{ scale: 1.02 }} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
                  <FaCalendarAlt className="text-blue-500" />
                  <strong className="text-blue-600">Date:</strong> {booking.date}
                </motion.p>

                <motion.p whileHover={{ scale: 1.02 }} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
                  <FaClock className="text-blue-500" />
                  <strong className="text-blue-600">Time Slot:</strong> {booking.slot}
                </motion.p>

                <motion.p whileHover={{ scale: 1.02 }} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
                  <FaDoorOpen className="text-blue-500" />
                  <strong className="text-blue-600">Room:</strong> {booking.roomNumber}
                </motion.p>

                <motion.p whileHover={{ scale: 1.02 }} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
                  {booking.status.toLowerCase() === "approved" ? 
                    <FaCheckCircle className="text-green-500" /> : 
                    <FaTimesCircle className="text-red-500" />
                  }
                  <strong className="text-blue-600">Status:</strong>
                  <span className={`font-semibold px-3 py-1 rounded-full ${
                    booking.status.toLowerCase() === "approved" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-red-100 text-red-700"
                  }`}>
                    {booking.status}
                  </span>
                </motion.p>
              </div>

              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                className="mt-4 bg-gray-50 p-4 rounded-xl"
              >
                <strong className="text-blue-600">Team Members:</strong>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  {booking.teamMembers?.map((member, i) => (
                    <motion.li 
                      key={i}
                      whileHover={{ x: 10 }}
                      className="text-gray-700"
                    >
                      {member.name} ({member.enrollmentNo})
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
      </motion.div>
    </>
  );
};

export default AdminHistory;
