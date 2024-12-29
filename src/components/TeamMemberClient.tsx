"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion"; // Import framer-motion

const TeamMemberClient = ({ member }: { member: any }) => {
  return (
    <motion.div
      className="container py-24 mx-auto"
      initial={{ opacity: 0 }} // Initial state: invisible
      animate={{ opacity: 1 }} // Final state: fully visible
      transition={{ duration: 0.8 }} // Duration of the fade-in effect
    >
      <div className="flex flex-col md:flex-row items-center gap-10">
        <motion.div
          className="w-full md:w-1/3"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6 }}>
          <Image
            src={member.image}
            width={300}
            height={400}
            alt={member.name}
            className="rounded-xl shadow-lg"
          />
        </motion.div>

        <div className="w-full md:w-2/3 space-y-6">
          <motion.h1
            className="text-4xl font-semibold text-primary"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}>
            {member.name}
          </motion.h1>

          <motion.h2
            className="text-2xl text-gray-600"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7 }}>
            {member.role}
          </motion.h2>

          <motion.p
            className="text-lg text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}>
            {member.bio}
          </motion.p>

          <motion.p
            className="text-lg text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}>
            {member.details}
          </motion.p>

          <motion.div
            className="text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}>
            <h3 className="text-xl font-semibold">Contact Information:</h3>
            <ul className="space-y-2">
              <li>
                Email:
                <a
                  href={`mailto:${member.email}`}
                  className="text-blue-500 hover:underline">
                  {member.email}
                </a>
              </li>
              <li>
                Whatsapp/Viber:
                <a
                  href={`tel:${member.contact}`}
                  className="text-blue-500 hover:underline">
                  {member.contact}
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1 }}>
            <h3 className="text-xl font-semibold">Educational Background:</h3>
            <ul className="space-y-2">
              {member.education.map((edu: any, idx: any) => (
                <li key={idx} className="list-disc pl-5">
                  {edu}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamMemberClient;
