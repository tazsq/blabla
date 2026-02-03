import { motion } from "framer-motion";
import { MapPin, Calendar, User, Search } from "lucide-react";
export function Hero() {
  return (
    <section className="relative w-full min-h-[600px] bg-[#00AFF5] flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto text-center mb-12">
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
        >
          Your pick of rides at low prices
        </motion.h1>
        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
          className="text-xl text-blue-50 font-medium"
        >
          Save money, meet people, and travel sustainably.
        </motion.p>
      </div>

      {/* Search Widget */}
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          delay: 0.4,
        }}
        className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-2 md:p-4"
      >
        <form
          className="flex flex-col md:flex-row items-center gap-2 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* From */}
          <div className="w-full md:flex-1 relative group">
            <div className="flex items-center px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
              <MapPin className="w-5 h-5 text-gray-400 mr-3 group-hover:text-[#00AFF5] transition-colors" />
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                  Leaving from
                </label>
                <input
                  type="text"
                  placeholder="City, airport, or station"
                  className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400 font-medium"
                />
              </div>
            </div>
          </div>

          {/* To */}
          <div className="w-full md:flex-1 relative group">
            <div className="flex items-center px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
              <MapPin className="w-5 h-5 text-gray-400 mr-3 group-hover:text-[#00AFF5] transition-colors" />
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                  Going to
                </label>
                <input
                  type="text"
                  placeholder="City, airport, or station"
                  className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="w-full md:w-48 relative group">
            <div className="flex items-center px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
              <Calendar className="w-5 h-5 text-gray-400 mr-3 group-hover:text-[#00AFF5] transition-colors" />
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full bg-transparent outline-none text-gray-900 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Passengers */}
          <div className="w-full md:w-40 relative group">
            <div className="flex items-center px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
              <User className="w-5 h-5 text-gray-400 mr-3 group-hover:text-[#00AFF5] transition-colors" />
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                  Passengers
                </label>
                <select className="w-full bg-transparent outline-none text-gray-900 font-medium appearance-none cursor-pointer">
                  <option>1 passenger</option>
                  <option>2 passengers</option>
                  <option>3 passengers</option>
                  <option>4+ passengers</option>
                </select>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="w-full md:w-auto p-2">
            <button className="w-full md:w-auto bg-[#00AFF5] hover:bg-[#0099D6] text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center shadow-lg hover:shadow-xl">
              <Search className="w-6 h-6 md:mr-2" />
              <span className="md:hidden">Search rides</span>
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
