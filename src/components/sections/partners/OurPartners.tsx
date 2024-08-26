import Image from "next/image";
import React from "react";

const OurPartners = () => {
  const partners = [
    { id: 1, name: "Partner 1", logo: "path/to/logo1.png" },
    { id: 2, name: "Partner 2", logo: "path/to/logo2.png" },
    { id: 3, name: "Partner 3", logo: "path/to/logo3.png" },
    { id: 4, name: "Partner 4", logo: "path/to/logo4.png" },
    { id: 5, name: "Partner 5", logo: "path/to/logo5.png" },
  ];

  return (
    <div className="w-full overflow-hidden bg-white">
      <div className="flex animate-marquee">
        {partners.concat(partners).map((partner) => (
          <Image
            key={`${partner.id}-${Math.random()}`}
            src={partner.logo}
            alt={partner.name}
            width={100}
            height={100}
            className="h-12 mx-8"
          />
        ))}
      </div>
    </div>
  );
};

export default OurPartners;
