import { motion } from "framer-motion";
import { Search, Ticket, Car } from "lucide-react";
const steps = [
  {
    icon: Search,
    title: "Search for a ride",
    description:
      "Enter your destination and travel dates to see who's going your way.",
  },
  {
    icon: Ticket,
    title: "Book your seat",
    description:
      "Check profiles and reviews, then book your seat securely online.",
  },
  {
    icon: Car,
    title: "Travel together",
    description: "Meet your driver, share the costs, and enjoy the journey.",
  },
];
export function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How it works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Getting where you need to go is easier than ever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
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
                duration: 0.5,
                delay: index * 0.2,
              }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-[#00AFF5]">
                <step.icon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
