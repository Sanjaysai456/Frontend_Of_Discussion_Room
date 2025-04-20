import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaBook, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute w-96 h-96 -top-48 -right-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute w-96 h-96 -bottom-48 -left-48 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 4 + 'px',
              height: Math.random() * 4 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 10 + 10}s linear infinite`
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
        <div className="text-center">
          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 text-shadow-lg"
          >
            Welcome to the LIRC Discussion Room Booking Portal
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto"
          >
            Reserve your space for academic discussions, group studies, and research collaborations.
          </motion.p>

          {/* Floating Book Icon */}
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="mb-12"
          >
            <FaBook className="text-6xl text-yellow-400 mx-auto drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
          </motion.div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/student-form')}
            className="px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-full text-lg font-semibold shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.8)] transition-all duration-300 mb-16"
          >
            📚 Book a Discussion Room
          </motion.button>

          {/* Quotes Section */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-white/20"
            >
              <FaQuoteLeft className="text-blue-400 mb-4" />
              <p className="text-lg text-gray-200 italic mb-4">
                "A room without books is like a body without a soul."
              </p>
              <p className="text-gray-300 font-semibold">- Cicero</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-white/20"
            >
              <FaQuoteLeft className="text-blue-400 mb-4" />
              <p className="text-lg text-gray-200 italic mb-4">
                "The only thing that you absolutely have to know, is the location of the library."
              </p>
              <p className="text-gray-300 font-semibold">- Albert Einstein</p>
            </motion.div>
          </div>

          {/* What is LIRC Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-white/20 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-serif font-bold text-white mb-4">What is LIRC?</h2>
            <p className="text-gray-300">
              The Library Information Resource Center (LIRC) is your gateway to academic excellence. 
              Our discussion rooms provide the perfect environment for collaborative learning, 
              group projects, and intellectual discourse. Equipped with modern amenities and 
              designed for comfort, these spaces help transform ideas into achievements.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
