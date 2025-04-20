import React, { useState } from 'react';
import API from '../services/api';
import { motion } from 'framer-motion';
import { FaUser, FaIdCard, FaEnvelope, FaDoorOpen, FaClock, FaCalendarAlt, FaUsers, FaUserPlus, FaUserMinus, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function StudentBookingForm() {
  const [form, setForm] = useState({
    leaderName: '',
    leaderEnrollmentNo: '',
    leaderEmail: '',
    roomNumber: '',
    date: '',
    slot: '',
    teamMembers: [{ name: '', enrollmentNo: '', email: '' }],
  });

  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTeamChange = (index, field, value) => {
    const updated = [...form.teamMembers];
    updated[index][field] = value;
    setForm({ ...form, teamMembers: updated });
  };

  const addTeamMember = () => {
    setForm({
      ...form,
      teamMembers: [...form.teamMembers, { name: '', enrollmentNo: '', email: '' }],
    });
  };

  const removeTeamMember = (index) => {
    const updated = [...form.teamMembers];
    updated.splice(index, 1);
    setForm({ ...form, teamMembers: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/bookings', form);
      setPopupMessage(' ✅ Booking request submitted!');
      setShowPopup(true);
      setForm({
        leaderName: '',
        leaderEnrollmentNo: '',
        leaderEmail: '',
        roomNumber: '',
        date: '',
        slot: '',
        teamMembers: [{ name: '', enrollmentNo: '', email: '' }],
      });
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setPopupMessage(err.response.data.message || '❌ Slot already booked');
      } else {
        setPopupMessage('❌ Error submitting booking. Try again.');
      }
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute w-96 h-96 -top-48 -right-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute w-96 h-96 -bottom-48 -left-48 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      </div>

      {/* Pop-up Modal */}
      {showPopup && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div 
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-sm w-full border border-white/20"
          >
            <p className="text-xl text-white flex items-center justify-center gap-2">
              {popupMessage}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-6 py-3 bg-white/10 backdrop-blur-lg text-white rounded-xl hover:bg-white/20 transition-all w-full"
              onClick={closePopup}
            >
              OK
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 max-w-4xl mx-auto px-4 py-12"
      >
        <motion.div 
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
          whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
        >
          <motion.h2 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-3xl font-bold text-center mb-8 text-white"
          >
            Room Booking System
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Leader Details */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <FaUser className="text-blue-400" />
                Leader Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    name="leaderName"
                    placeholder="Leader Name"
                    value={form.leaderName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all text-white placeholder-gray-300"
                    required
                  />
                </div>
                <div className="relative">
                  <FaIdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    name="leaderEnrollmentNo"
                    placeholder="Enrollment No"
                    value={form.leaderEnrollmentNo}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all text-white placeholder-gray-300"
                    required
                  />
                </div>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    name="leaderEmail"
                    type="email"
                    placeholder="Email"
                    value={form.leaderEmail}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all text-white placeholder-gray-300"
                    required
                  />
                </div>
              </div>
            </motion.div>

            {/* Booking Details */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <FaDoorOpen className="text-blue-400" />
                Booking Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <FaDoorOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    name="roomNumber"
                    value={form.roomNumber}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all text-white"
                    required
                  >
                    <option value="" className="bg-gray-900">Select Room</option>
                    <option value="1" className="bg-gray-900">Room 1</option>
                    <option value="2" className="bg-gray-900">Room 2</option>
                  </select>
                </div>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all text-white"
                    required
                  />
                </div>
              </div>
              <div className="mt-4 relative">
                <FaClock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  name="slot"
                  value={form.slot}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all text-white"
                  required
                >
                  <option value="" className="bg-gray-900">Select Time Slot</option>
                  <option value="09:30 AM - 10:30 AM" className="bg-gray-900">09:30 AM - 10:30 AM</option>
                  <option value="10:30 AM - 11:30 AM" className="bg-gray-900">10:30 AM - 11:30 AM</option>
                  <option value="11:30 AM - 12:30 PM" className="bg-gray-900">11:30 AM - 12:30 PM</option>
                  <option value="12:30 PM - 01:30 PM" className="bg-gray-900">12:30 PM - 01:30 PM</option>
                  <option value="01:30 PM - 02:30 PM" className="bg-gray-900">01:30 PM - 02:30 PM</option>
                  <option value="02:30 PM - 03:30 PM" className="bg-gray-900">02:30 PM - 03:30 PM</option>
                  <option value="03:30 PM - 04:30 PM" className="bg-gray-900">03:30 PM - 04:30 PM</option>
                  <option value="04:30 PM - 05:30 PM" className="bg-gray-900">04:30 PM - 05:30 PM</option>
                </select>
              </div>
            </motion.div>

            {/* Team Members */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <FaUsers className="text-blue-400" />
                  Team Members
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={addTeamMember}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg text-white rounded-xl hover:bg-white/20 transition-all"
                >
                  <FaUserPlus />
                  Add Member
                </motion.button>
              </div>

              <div className="space-y-4">
                {form.teamMembers.map((member, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          placeholder="Name"
                          value={member.name}
                          onChange={(e) => handleTeamChange(index, 'name', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all text-white placeholder-gray-300"
                          required
                        />
                      </div>
                      <div className="relative">
                        <FaIdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          placeholder="Enrollment No"
                          value={member.enrollmentNo}
                          onChange={(e) => handleTeamChange(index, 'enrollmentNo', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all text-white placeholder-gray-300"
                          required
                        />
                      </div>
                      <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          placeholder="Email"
                          value={member.email}
                          onChange={(e) => handleTeamChange(index, 'email', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all text-white placeholder-gray-300"
                          required
                        />
                      </div>
                    </div>
                    {index !== 0 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => removeTeamMember(index)}
                        className="mt-4 flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <FaUserMinus />
                        Remove Member
                      </motion.button>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white py-4 rounded-xl text-lg font-medium hover:shadow-lg transition-all duration-200"
            >
              Confirm Booking
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
