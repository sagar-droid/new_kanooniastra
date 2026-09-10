import Image from "next/image";
import React from "react";
// import "./OurPartners.css";

const OurPartners = () => {
  const partners = [
    { id: 1, name: "Tzu Chi INGO Nepal", logo: "/partner1.jpeg" },
    { id: 2, name: "People and planet", logo: "/partner2.jpeg" },
    { id: 3, name: "Brij Eee Vee Private Limited", logo: "/partner3.jpeg" },
    { id: 4, name: "Hotel Sabrina", logo: "/partner4.jpeg" },
    { id: 5, name: "BYSST music", logo: "/partner5.jpeg" },
    { id: 6, name: "Bigya traders", logo: "/partner6.jpeg" },
    { id: 7, name: "Parth tech", logo: "/partner7.jpeg" },
    { id: 8, name: "Nepin International Pvt. Ltd.", logo: "/partner8.jpeg" },
    { id: 9, name: "Harisiddhi villa", logo: "/partner9.jpg" },
    { id: 10, name: "Lords hotels and resorts", logo: "/partner10.jpg" },
    { id: 11, name: "Kantibir group", logo: "/partner11.jpg" },
    { id: 12, name: "Aakriti dana udhyog", logo: "/partner12.jpg" },
    { id: 13, name: "Hotel sai palace and spa pvt. ltd.", logo: "/partner13.jpg" },
    { id: 14, name: "Kadak24", logo: "/partner14.jpg" },
    { id: 15, name: "Michael grills", logo: "/partner15.jpg" },
    { id: 16, name: "Lavie hospitality group", logo: "/partner16.jpg" },
    { id: 17, name: "Windy Hill Hotel & Resturant", logo: "/partner17.jpg" },
    { id: 18, name: "Aegis Software Pvt. Ltd.", logo: "/partner18.jpg" },

  ];

  return (
    <div className="w-full relative overflow-hidden bg-white ">
      <h2
        className="text-4xl md:text-5xl pt-10 flex justify-center font-bold text-gray-800 mb-6"
        data-aos="fade-up"
        data-aos-once="true">
        Our Happy Clients
      </h2>
      {/* First row of logos */}
      <div className="flex py-24 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
        {partners.map((partner) => (
          <Image
            key={`first-${partner.id}`}
            src={partner.logo}
            alt={partner.name}
            width={100}
            height={100}
            className="h-32 w-40 mx-8 inline-block object-contain transition-transform duration-300 hover:scale-105 cursor-pointer"
          />
        ))}
        {partners.map((partner) => (
          <Image
            key={`second-${partner.id}`}
            src={partner.logo}
            alt={partner.name}
            width={100}
            height={100}
            className="h-32 w-40 mx-8 inline-block object-contain transition-transform duration-300 hover:scale-105 cursor-pointer"
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
