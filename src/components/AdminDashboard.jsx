import { useEffect, useState } from "react";
import React from "react";
import AdminNavbar from "./AdminNavbar";
import API from "../services/api";
import { motion } from "framer-motion";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get("/bookings");
      setBookings(res.data);
    };
    fetchData();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/admin/bookings/${id}/${status}`);
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === id ? { ...booking, status } : booking
        )
      );
      
      // Show success notification
      if (status === "approve") {
        toast.success('Booking request approved successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else if (status === "reject") {
        toast.error('Booking request rejected!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error('Failed to update booking status!', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <AdminNavbar />
      <ToastContainer />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto my-10 p-8 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl"
      >
        <motion.h1 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-10 flex items-center justify-center gap-3"
        >
          <span role="img" aria-label="icon" className="animate-bounce">📋</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Admin Dashboard
          </span>
        </motion.h1>

        {bookings.filter((booking) => booking.status.toLowerCase() === "pending").map((booking, index) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            key={booking._id}
            className="border border-gray-200 p-6 rounded-2xl mb-6 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white backdrop-blur-lg"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <motion.p whileHover={{ scale: 1.02 }} className="p-2 rounded-lg hover:bg-gray-50">
                <strong className="text-blue-600">Leader Name:</strong> {booking.leaderName}
              </motion.p>
              <motion.p whileHover={{ scale: 1.02 }} className="p-2 rounded-lg hover:bg-gray-50">
                <strong className="text-blue-600">Enrollment No:</strong> {booking.leaderEnrollmentNo}
              </motion.p>
              <motion.p whileHover={{ scale: 1.02 }} className="p-2 rounded-lg hover:bg-gray-50">
                <strong className="text-blue-600">Email:</strong> {booking.leaderEmail}
              </motion.p>
              <motion.p whileHover={{ scale: 1.02 }} className="p-2 rounded-lg hover:bg-gray-50">
                <strong className="text-blue-600">Date:</strong> {booking.date}
              </motion.p>
              <motion.p whileHover={{ scale: 1.02 }} className="p-2 rounded-lg hover:bg-gray-50">
                <strong className="text-blue-600">Time Slot:</strong> {booking.slot}
              </motion.p>
              <motion.p whileHover={{ scale: 1.02 }} className="p-2 rounded-lg hover:bg-gray-50">
                <strong className="text-blue-600">Room:</strong> {booking.roomNumber}
              </motion.p>
              <motion.p whileHover={{ scale: 1.02 }} className="p-2 rounded-lg hover:bg-gray-50">
                <strong className="text-blue-600">Status:</strong>{" "}
                <span className={`font-semibold px-3 py-1 rounded-full ${
                  booking.status === "pending" ? "bg-yellow-100 text-yellow-700" : 
                  booking.status === "approved" ? "bg-green-100 text-green-700" : 
                  "bg-red-100 text-red-700"
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
                {booking.teamMembers.map((member, i) => (
                  <motion.li 
                    key={i}
                    whileHover={{ x: 10 }}
                    className="text-gray-700"
                  >
                    {member.name} ({member.enrollmentNo}, {member.email})
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {booking.status.toLowerCase() === "pending" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 flex gap-4 justify-end"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => updateStatus(booking._id, "approve")}
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Approve
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => updateStatus(booking._id, "reject")}
                  className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Reject
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default AdminDashboard;
