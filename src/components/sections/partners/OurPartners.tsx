import Image from "next/image";
import React from "react";

const OurPartners = () => {
  const partners = [
    { id: 1, name: "Partner 1", logo: "/partner1.jpeg" },
    { id: 2, name: "Partner 2", logo: "/partner2.jpeg" },
    { id: 3, name: "Partner 3", logo: "/partner3.jpeg" },
    { id: 4, name: "Partner 4", logo: "/partner4.jpeg" },
    { id: 5, name: "Partner 5", logo: "/partner5.jpeg" },
    { id: 6, name: "Partner 6", logo: "/partner6.jpeg" },
    { id: 7, name: "Partner 7", logo: "/partner7.jpeg" },
    { id: 8, name: "Partner 8", logo: "/partner8.jpeg" },
  ];

  return (
    <div className="w-full py-24 overflow-hidden bg-white">
      <div className="flex animate-marquee">
        {partners.concat(partners).map((partner) => (
          <Image
            key={`${partner.id}-${Math.random()}`}
            src={partner.logo}
            alt={partner.name}
            width={100}
            height={100}
            className=" h-32 w-40 mx-8"
          />
        ))}
      </div>
    </div>
  );
};

export default OurPartners;
