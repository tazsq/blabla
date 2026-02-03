import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
export function CTASection() {
  return (
    <section className="py-24 bg-[#00AFF5] relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <motion.h2
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-4xl md:text-5xl font-bold text-white mb-8"
        >
          Ready to hit the road?
        </motion.h2>

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="w-full sm:w-auto px-8 py-4 bg-white text-[#00AFF5] font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-lg flex items-center justify-center group">
            Find a ride
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-[#008CC2] text-white font-bold rounded-xl hover:bg-[#007AB0] transition-colors shadow-lg border border-white/20">
            Offer a ride
          </button>
        </motion.div>
      </div>
    </section>
  );
}
