import Button from "@/components/common/Button";
import Link from "next/link";
import React from "react";
import { services } from "../../../../data/services";

const OurServices = () => {
  return (
    <section className="py-12 relative overflow-x-hidden w-full">
      {/* Clipped background */}
      <div
        className="absolute inset-0 bg-black z-0 w-full"
        style={{
          clipPath: "polygon(100% 0, 0% 100%, 100% 100%)",
        }}></div>

      {/* Content */}
      <article className="container relative z-10 mx-auto px-4">
        <h2
          className="text-5xl font-bold text-center text-gray-800 mb-8"
          data-aos="fade-up"
          data-aos-once="true">
          Our Services
        </h2>
        <div className="flex flex-wrap justify-center gap-6 w-full">
          {services.slice(0, 6).map((service, index) => (
            <Link
              key={service.id}
              href={`/our-services/${service.id}`}
              className="block w-full sm:w-auto"
              data-aos="fade-up"
              data-aos-once="true"
              data-aos-delay={index * 100}>
              <div className="bg-white group rounded-lg w-full sm:w-[300px] shadow-md p-6 h-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                {service.description.length > 0 && (
                  <ul className="text-gray-600 text-lg list-disc list-outside ml-4">
                    {service.description.slice(0, 3).map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                    {service.description.length > 3 && <li>...</li>}
                  </ul>
                )}
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center items-center mt-8">
          <Button title="View All" link="/our-services" />
        </div>
      </article>
    </section>
  );
};

export default OurServices;
