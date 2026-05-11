import React from "react";
import { motion } from "framer-motion";
import { 
  IconHeart, 
  IconCalendar, 
  IconShieldCheck, 
  IconMapPin, 
  IconActivity 
} from "@tabler/icons-react";

export default function About() {
  const items = [
    { icon: <IconHeart size={22} className="text-primary" />, label: "Trusted pet care services for grooming, walking, and health." },
    { icon: <IconCalendar size={22} className="text-primary" />, label: "Easy booking and scheduling anytime, anywhere." },
    { icon: <IconShieldCheck size={22} className="text-primary" />, label: "Verified caregivers ensuring safety and reliability." },
    { icon: <IconMapPin size={22} className="text-primary" />, label: "Find nearby services based on your location." },
    { icon: <IconActivity size={22} className="text-primary" />, label: "Real-time tracking and updates for every service." },
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white">
            About Paw-sitive
          </h2>

          <p className="mt-4 text-gray-700 dark:text-gray-200 leading-relaxed">
            Paw-sitive is a smart pet care platform that connects pet owners with trusted services like grooming, walking, 
            and veterinary care. It simplifies booking, ensures verified providers, and delivers a safe and comfortable 
            experience for your pets — all in one place.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-3 rounded-xl bg-gray-50 dark:bg-neutral-900 p-4 border border-gray-200 dark:border-neutral-800 hover:shadow-md transition"
              >
                <div className="shrink-0 mt-0.5">{item.icon}</div>
                <p className="text-gray-700 dark:text-gray-300 text-sm md:text-[15px]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="h-full rounded-2xl bg-blue-50/70 dark:bg-neutral-900 p-6 border border-blue-100 dark:border-neutral-800 shadow-sm">
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Why it matters
            </h3>

            <p className="mt-3 text-gray-700 dark:text-gray-300">
              Pets are family, and they deserve the best care. Paw-sitive makes it easy to find trusted services, 
              ensuring convenience for owners and comfort for pets.
            </p>

            <p className="mt-4 text-gray-900 dark:text-gray-100 font-medium italic">
              "Because every pet deserves love, care, and attention."
            </p>

          </div>
        </motion.div>

      </div>
    </section>
  );
}