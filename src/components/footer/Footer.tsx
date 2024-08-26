import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { LiaLinkedin } from "react-icons/lia";

const Footer = () => {
  return (
    <section className=" bg-primary py-20">
      <Image
        src={"/logo.svg"}
        alt="logo"
        width={100}
        height={100}
        className=" mx-5 md:mx-10 xl:mx-10"
      />
      <article className=" container text-white flex gap-10">
        <div>
          <ul className=" flex flex-col text-xl mt-10 gap-4">
            <li>
              Phone no: +977 <span>9843671048</span>, <span>9844393183</span> ,
              <span>9867350369</span>
            </li>
            <li>Email: kanooniastra@gmail.com</li>
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
        <div>
          <ul className=" flex flex-col text-xl mt-10 gap-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>Services</li>
            <li>Solutions</li>
            <li>Company</li>
          </ul>
        </div>
      </article>
    </section>
  );
};

export default Footer;
