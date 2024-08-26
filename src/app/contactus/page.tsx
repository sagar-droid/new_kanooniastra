import React from "react";

const ContactUs = () => {
  return (
    <section className="container py-24">
      <h1 className="text-5xl flex justify-center items-center mb-12">
        Thank you for contacting <span className="text-primary ml-2">US</span>
      </h1>
      <article className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 text-xl bg-gray-100 p-6 rounded-lg">
          <h2 className="text-3xl font-semibold mb-4">Contact Details</h2>
          <p className="mb-2">
            <strong>Address:</strong> Adwaitmarg, Bagbazar, Kathmandu, Nepal.
          </p>
          <p className="mb-2">
            <strong>Phone:</strong>{" "}
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
          </p>
          <p className="mb-2">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:kanooniastra@gmail.com"
              className=" hover:underline"
            >
              kanooniastra@gmail.com
            </a>
          </p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.4530915269293!2d85.3169575120045!3d27.703293576085628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1900638a26d9%3A0x2cc8d8288a524442!2sKanooni%20Astra!5e0!3m2!1sen!2snp!4v1724668607999!5m2!1sen!2snp"
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="flex-1 place-content-center">
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full p-2 border rounded"
              ></textarea>
            </div>
            <button
              type="submit"
              className=" rounded-lg bg-primary p-2 text-white hover:border-black hover:border-2 hover:bg-white border-2 border-white hover:text-black"
            >
              Send Message
            </button>
          </form>
        </div>
      </article>
    </section>
  );
};

export default ContactUs;
