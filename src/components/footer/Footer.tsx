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
      <article className=" container justify-evenly text-white flex flex-col flex-wrap lg:flex-row gap-10">
        <div>
          <div className=" flex gap-4 items-center">
            <Image
              src="/logowhite.png"
              alt="logo_footer"
              height={100}
              width={100}
              className=""
            />
            <div
              className=""
              data-aos="fade-right"
              // data-aos-once="true"
              data-aso-delay="500"
              data-aos-offset="-100">
              <h2 className=" text-4xl">Kanooniastra</h2>
              <p className=" text-lg italic">" Astra For All Legal Issues "</p>
            </div>
          </div>
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
        </div>
        <div className=" flex md:flex-row flex-col gap-10 justify-between">
          <div className=" flex gap-10">
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
          <div className=" md:mt-10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.453091526934!2d85.31695751106733!3d27.7032935760855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1900638a26d9%3A0x2cc8d8288a524442!2sKanooni%20Astra!5e0!3m2!1ses!2snp!4v1736685341819!5m2!1ses!2snp"
              width="300"
              height="250"
              // style={"border:0;"}
              // allowFullScreen=""
              loading="lazy"
              className=" rounded-lg"
              referrerPolicy="no-referrer-when-downgrade"></iframe>
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
