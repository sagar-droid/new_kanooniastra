import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { LiaLinkedin } from "react-icons/lia";

const Footer = () => {
  return (
    <section className=" bg-primary py-20">
      {/* <Image
        src={"/logo.svg"}
        alt="logo"
        width={100}
        height={100}
        className=" mx-5 md:mx-10 xl:mx-10"
      /> */}
      <article className=" container justify-evenly text-white flex flex-col md:flex-row gap-10">
        <div>
          <ul className=" flex flex-col text-xl mt-10 gap-4">
            <li>
              Phone no:{" "}
              <a href="tel:+9779843671048" className=" hover:underline">
                +977 9843671048
              </a>
              ,{" "}
              <a href="tel:+9779844393183" className=" hover:underline">
                9844393183
              </a>
              ,{" "}
              <a href="tel:+9779867350369" className=" hover:underline">
                9867350369
              </a>
            </li>
            <li>
              Email:{" "}
              <a
                href="mailto:kanooniastra@gmail.com"
                className=" hover:underline">
                kanooniastra@gmail.com
              </a>
            </li>
            <li>Address: Adwaitmarg, Bagbazar, Kathmandu, Nepal.</li>
            <li className=" flex gap-6">
              <span>
                <Link href="https://www.facebook.com/KanooniAstra">
                  <FaFacebook />
                </Link>
              </span>
              <span>
                <Link href="https://www.linkedin.com/company/kanooni-astra">
                  <BsLinkedin />
                </Link>
              </span>
              <span>
                <Link href="https://www.instagram.com/kanooni_astra/?hl=en">
                  <BsInstagram />
                </Link>
              </span>
            </li>
          </ul>
        </div>
        <div className=" flex gap-10 justify-between">
          <div>
            <ul className=" flex flex-col text-xl mt-10 gap-4">
              <li className=" hover:text-black">
                <Link href="/">Home</Link>
              </li>
              <li className=" hover:text-black">
                <Link href="/our-services">Services</Link>
              </li>
              {/* <li className=" hover:text-black">
                <Link href="#">Solutions</Link>
              </li> */}
            </ul>
          </div>
          <div>
            <ul className=" flex flex-col text-xl mt-10 gap-4">
              <li className=" hover:text-black">
                <Link href="/aboutus">About Us</Link>
              </li>
              {/* <li className=" hover:text-black">
                <Link href="">Company</Link>
              </li> */}
            </ul>
          </div>
        </div>
      </article>
      <article
        className=" flex pt-24 font-bold text-white tracking-[1rem] md:tracking-[3rem] justify-center items-center md:text-3xl lg:text-7xl"
        data-aos="fade-down"
        // data-aos-once="true"
        data-aso-delay="500"
        data-aos-offset="-100">
        <h2>KANOONIASTRA</h2>
      </article>
      <div className="flex justify-center items-center text-white mt-10">
        <p>&copy; {new Date().getFullYear()} KANOONIASTRA</p>
      </div>
    </section>
  );
};

export default Footer;
