import { motion } from "framer-motion";
import { Shield, Star, Users, CheckCircle } from "lucide-react";
export function TrustSection() {
  return (
    <section className="py-24 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Trust & Safety
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Travel with confidence
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We take safety seriously. From verified profiles to 24/7 support,
              we ve got your back every mile of the way.
            </p>

            <ul className="space-y-4">
              {[
                "Government ID verification for all members",
                "Two-way rating system for drivers and passengers",
                "Secure online payments and fraud protection",
                "24/7 member support team",
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#00AFF5] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                label: "Members worldwide",
                value: "50M+",
                icon: Users,
              },
              {
                label: "Average rating",
                value: "4.8/5",
                icon: Star,
              },
              {
                label: "Shared rides",
                value: "1B+",
                icon: CheckCircle,
              },
              {
                label: "Years of trust",
                value: "15+",
                icon: Shield,
              },
            ].map((stat, index) => (
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
                  delay: index * 0.1,
                }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <stat.icon className="w-8 h-8 text-[#00AFF5] mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
