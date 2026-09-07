import React from "react";
import { cn } from "../../../../utils/cn";

const KanooniAstraValues = () => {
  const values = [
    {
      id: 1,
      title: "Integrity",
      description:
        "Kanooni Astra advises clients in plain, direct language about what Nepali law requires, what a matter will cost, and what risks it carries, before the engagement begins rather than after. Advocates disclose conflicts of interest and give case status updates as standard practice, not as an exception.",
      iconClass: "bg-primary/10",
    },
    {
      id: 2,
      title: "Excellence",
      description:
        "Kanooni Astra's advocates track changes to Nepal's regulatory framework, including company registration requirements, FDI approval procedures, and intellectual property filing rules, so client strategy stays current with the law rather than reactive to it.",
      iconClass: "bg-primary/10",
    },
    {
      id: 3,
      title: "Client-Centricity",
      description:
        "Kanooni Astra tailors its approach to each client's actual objective: a foreign investor seeking FDI approval needs different support than a family navigating a custody dispute in Kathmandu. Advocates confirm that objective at intake rather than defaulting to a standard process.",
      iconClass: "bg-primary/10",
    },
    {
      id: 4,
      title: "Collaboration",
      description:
        "Kanooni Astra's advocates coordinate across practice areas on matters that cross legal lines, such as a property transaction that also involves a corporate ownership structure. That cross-practice review happens on multi-issue matters as a matter of course, not as a special arrangement.",
      iconClass: "bg-primary/10",
    },
    {
      id: 5,
      title: "Social Responsibility",
      description:
        "Kanooni Astra takes on pro bono and reduced-fee matters for clients in Kathmandu and across Nepal who cannot otherwise afford legal representation, alongside its regular fee-paying caseload.",
      iconClass: "bg-primary/10",
    },
    {
      id: 6,
      title: "Innovation",
      description:
        "Kanooni Astra adapts its procedures as Nepal's legal and regulatory landscape changes, including tracking evolving technology, media, and telecommunications (TMT) regulation as that sector grows in Nepal. Process changes are treated as an ordinary part of practicing law, not a special initiative.",
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
            Kanooni Astra is a law firm based in Kathmandu, Nepal, practicing
            across foreign direct investment, intellectual property, corporate,
            property, and family law. The six principles below describe how
            the firm&apos;s advocates handle client matters day to day.
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
            These principles shape how Kanooni Astra&apos;s advocates handle
            every case, from initial consultation through resolution.
          </p>
        </div>
      </div>
    </section>
  );
};

export default KanooniAstraValues;
