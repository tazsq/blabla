import { motion } from "framer-motion";
import { Wallet, Leaf, Heart } from "lucide-react";
const benefits = [
  {
    icon: Wallet,
    title: "Save huge on travel",
    description:
      "Get where you're going for up to 70% less than train or plane tickets.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Leaf,
    title: "Protect the planet",
    description:
      "Carpooling reduces carbon emissions by filling empty seats on the road.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Heart,
    title: "Connect with people",
    description:
      "Turn a boring commute into a conversation with verified community members.",
    color: "bg-pink-100 text-pink-600",
  },
];
export function Benefits() {
  return (
    <section className="py-24 bg-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 ">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 ">
            Why ride with us?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -8,
              }}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg shadow-gray-100/50 transition-all"
            >
              <div
                className={`w-14 h-14 ${benefit.color} rounded-2xl flex items-center justify-center mb-6`}
              >
                <benefit.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
