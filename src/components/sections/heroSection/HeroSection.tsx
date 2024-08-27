import Button from "@/components/common/Button";
import MenuItems from "@/components/navbar/menuItems/MenuItems";
import MobileMenu from "@/components/navbar/mobileMenu/MobileMenu";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* <Navbar /> */}
      <section className=" bg-transparent z-10 w-full absolute top-0">
        <article className=" container py-10 hidden md:flex gap-20 text-white items-center">
          <div>
            <Image src="/logo.png" alt="logo" width={100} height={100} />
          </div>
          <div className=" items-center text-lg flex justify-between w-full">
            <MenuItems />

            <Button title="Contact Us" link="/contactus" />
          </div>
        </article>
        <div className=" z-20">
          <MobileMenu />
        </div>
      </section>
      <section>
        <video
          className="absolute z-0 top-0 left-0 w-full h-[100vh] object-cover"
          autoPlay
          loop
          muted
          playsInline>
          <source src="/video.mp4" type="video/mp4" className=" w-full" />
          Your browser does not support the video tag.
        </video>
      </section>

      <article className="relative h-screen">
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl lg:text-[120px] uppercase text-primary font-bold">
            Kanoni
            <span className=" text-white">Astra</span>
          </h1>
        </div>
        <div className="absolute flex text-2xl items-center justify-center bottom-0 text-white p-8">
          <p>
            Beacon of{" "}
            <span className=" text-primary italic">legal excellence</span>{" "}
            forged by <br />
            <span className=" text-primary italic">passion</span> and{" "}
            <span className="text-primary italic"> commitment</span>
          </p>
        </div>
      </article>
    </section>
  );
};

export default HeroSection;
