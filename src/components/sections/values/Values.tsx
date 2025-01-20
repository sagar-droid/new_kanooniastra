import React from "react";
import { cn } from "../../../../utils/cn";

const KanooniAstraValues = () => {
  const values = [
    {
      id: 1,
      title: "Integrity",
      description:
        "We conduct ourselves with honesty, transparency, and ethical conduct at all times. Integrity is the bedrock of our relationships with clients, colleagues, and the community, and we remain steadfast in upholding the trust placed in us.",
      iconClass: "bg-primary/10",
    },
    {
      id: 2,
      title: "Excellence",
      description:
        "We are relentless in our pursuit of excellence, striving to deliver superior outcomes and innovative solutions to our clients' legal challenges. Our dedication to continuous improvement and learning ensures that we stay at the forefront of legal innovation.",
      iconClass: "bg-primary/10",
    },
    {
      id: 3,
      title: "Client-Centricity",
      description:
        "Our clients are at the heart of everything we do. We listen attentively to their needs, understand their objectives, and tailor our services to meet their unique requirements. Building lasting relationships based on trust, respect, and empathy is paramount to us.",
      iconClass: "bg-primary/10",
    },
    {
      id: 4,
      title: "Collaboration",
      description:
        "We believe in the power of teamwork and collaboration. By harnessing the collective expertise and diverse perspectives of our team members, we deliver comprehensive and holistic solutions that exceed our clients' expectations.",
      iconClass: "bg-primary/10",
    },
    {
      id: 5,
      title: "Social Responsibility",
      description:
        "We are committed to making a positive impact on society and giving back to the communities we serve. Through pro bono work, community service initiatives, and advocacy for social justice, we strive to be agents of positive change in the world.",
      iconClass: "bg-primary/10",
    },
    {
      id: 6,
      title: "Innovation",
      description:
        "We embrace creativity, innovation, and forward thinking in everything we do. By staying abreast of emerging legal trends, leveraging technology, and adopting progressive approaches, we continuously seek to redefine the boundaries of legal excellence.",
      iconClass: "bg-primary/10",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
            data-aos="fade-up"
            data-aos-once="true">
            Our Values
          </h2>
          <p
            className="text-xl text-gray-600 leading-relaxed"
            data-aos="fade-up"
            data-aos-once="true"
            data-aos-delay="100">
            At Kanooni Astra, our values form the cornerstone of everything we
            do. They guide our actions, shape our decisions, and define who we
            are as a firm. Our commitment to these core principles ensures that
            we uphold the highest standards of integrity, professionalism, and
            excellence in all our endeavors.
          </p>
        </div>

        {/* Values Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={value.id}
              className="group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              data-aos-once="true">
              <div className="bg-white rounded-xl p-8 h-full shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                <div className="mb-6">
                  {/* <div
                    className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                      value.iconClass
                    )}>
                    <span className="text-2xl font-bold text-primary">
                      {value.id}
                    </span>
                  </div> */}
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3 group-hover:text-primary transition-colors duration-300">
                    {value.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div
          className="max-w-3xl mx-auto text-center mt-16"
          data-aos="fade-up"
          data-aos-once="true"
          data-aos-delay="300">
          <p className="text-lg text-gray-600 italic">
            At Kanooni Astra, our values are not just words on a page; they are
            the guiding principles that inform our actions and shape our
            identity as a firm. We are proud to uphold these values each day as
            we work tirelessly to serve our clients and make a difference in the
            world.
          </p>
        </div>
      </div>
    </section>
  );
};

export default KanooniAstraValues;
