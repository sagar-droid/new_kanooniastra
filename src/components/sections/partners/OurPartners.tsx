import Image from "next/image";
import React from "react";
// import "./OurPartners.css";

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
    { id: 9, name: "Partner 9", logo: "/partner9.jpg" },
    { id: 10, name: "Partner 10", logo: "/partner10.jpg" },
    { id: 11, name: "Partner 11", logo: "/partner11.jpg" },
    { id: 12, name: "Partner 12", logo: "/partner12.jpg" },
    { id: 13, name: "Partner 13", logo: "/partner13.jpg" },
    { id: 14, name: "Partner 14", logo: "/partner14.jpg" },
    { id: 15, name: "Partner 15", logo: "/partner15.jpg" },
  ];

  return (
    <div className="w-full relative overflow-hidden bg-white py-24">
      {/* First row of logos */}
      <div className="flex animate-marquee whitespace-nowrap">
        {partners.map((partner) => (
          <Image
            key={`first-${partner.id}`}
            src={partner.logo}
            alt={partner.name}
            width={100}
            height={100}
            className="h-32 w-40 mx-8 inline-block"
          />
        ))}
        {partners.map((partner) => (
          <Image
            key={`second-${partner.id}`}
            src={partner.logo}
            alt={partner.name}
            width={100}
            height={100}
            className="h-32 w-40 mx-8 inline-block"
          />
        ))}
      </div>

      {/* <div className="flex absolute top-24 animate-marquee2 whitespace-nowrap">
        {partners.map((partner) => (
          <Image
            key={`third-${partner.id}`}
            src={partner.logo}
            alt={partner.name}
            width={100}
            height={100}
            className="h-32 w-40 mx-8 inline-block"
          />
        ))}
        {partners.map((partner) => (
          <Image
            key={`fourth-${partner.id}`}
            src={partner.logo}
            alt={partner.name}
            width={100}
            height={100}
            className="h-32 w-40 mx-8 inline-block"
          />
        ))}
      </div> */}
    </div>
  );
};

export default OurPartners;
