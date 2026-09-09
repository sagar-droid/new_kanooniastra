import type { Metadata } from "next";
import Link from "next/link";
import { connectToDatabase } from "@/lib/mongodb";
import FAQModel from "@/models/FAQ";
import FAQClientPage, { type FAQItem } from "./FAQClientPage";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Legal Services & Law in Nepal",
  description:
    "Explore answers to common questions about legal practice in Nepal: company registration, foreign direct investment (FDI), intellectual property rights, litigation, and court proceedings.",
  alternates: { canonical: "/faq" },
};

const DEFAULT_FAQS: FAQItem[] = [
  {
    id: "fdi-threshold-process",
    question: "What is the minimum investment threshold and approval process for Foreign Direct Investment (FDI) in Nepal?",
    answer:
      "Under Nepal's Foreign Investment and Technology Transfer Act (FITTA) 2019, the minimum foreign investment threshold is NPR 20 million per foreign investor. Approvals are administered through either the Department of Industries (DOI) or the Investment Board of Nepal (IBN), depending on project scale.\n\nThe procedure requires obtaining preliminary foreign investment approval, incorporating a private or public company at the Office of the Company Registrar, registering the industrial undertaking with the DOI, and securing capital repatriation and inward remittance approval from Nepal Rastra Bank.",
    category: "Foreign Direct Investment",
  },
  {
    id: "company-incorporation-steps",
    question: "How long does it take to incorporate a company in Nepal, and what are the key requirements?",
    answer:
      "Company registration in Nepal generally takes between 7 to 14 business days once preliminary documentation is finalized. The process involves:\n\n1. Reserving and getting approval for the unique company name on the Office of the Company Registrar (OCR) portal.\n2. Drafting and signing the Memorandum of Association (MOA) and Articles of Association (AOA).\n3. Submitting citizenship certificates or passport copies of promoters, directors, and witness attestations.\n4. Receiving the Certificate of Incorporation.\n5. Registering for PAN/VAT with the Inland Revenue Department and completing municipal ward office registration.",
    category: "Corporate Law",
  },
  {
    id: "trademark-first-to-file",
    question: "How are trademarks registered and protected in Nepal, and does Nepal follow first-to-file or first-to-use?",
    answer:
      "Nepal strictly adheres to the 'first-to-file' principle under the Patent, Design and Trademark Act 1965. Prior use abroad does not automatically protect your trademark within Nepal unless officially registered with the Department of Industries (DOI).\n\nThe registration process includes a trademark clearance search, formal application filing, preliminary examination by the examiner, publication in the industrial property bulletin for public opposition (90-day window), and issuance of the registration certificate, valid for 7 years and renewable indefinitely.",
    category: "Intellectual Property",
  },
  {
    id: "litigation-hierarchy",
    question: "What is the court structure and hierarchy for civil and commercial litigation in Nepal?",
    answer:
      "Nepal's judicial system consists of a three-tier hierarchy:\n\n• District Courts: The court of first instance for most civil, criminal, and commercial lawsuits across 77 districts.\n• High Courts: Provincial appellate courts located across seven provinces that hear appeals against District Court judgments and issue writs.\n• Supreme Court of Nepal: The apex court in Kathmandu, handling constitutional petitions, final appeals on points of substantial legal significance, and judicial review.\n\nSpecialized tribunals such as the Labor Court, Debt Recovery Tribunal, and Revenue Tribunal adjudicate specific domain disputes.",
    category: "Litigation",
  },
  {
    id: "annual-company-compliance",
    question: "What ongoing annual compliance filings must a registered company maintain in Nepal?",
    answer:
      "Companies in Nepal must maintain several periodic statutory compliances:\n\n• Annual General Meeting (AGM): Convened within six months of the end of each fiscal year.\n• OCR Filings: Submitting audited financial statements, director reports, auditor appointments, and share register updates to the Office of the Company Registrar.\n• Tax Compliance: Filing periodic VAT returns and annual income tax assessments (D-01, D-02, or D-03) with the Inland Revenue Department.\n• Local Ward Renewal: Annual renewal of commercial operating permits at the local municipal ward office.",
    category: "Corporate Law",
  },
  {
    id: "foreign-franchise-tta",
    question: "Can foreign brands enter into franchise or technology transfer agreements with Nepali entities?",
    answer:
      "Yes. Foreign brands and franchisors can enter into Technology Transfer Agreements (TTA), trademark licensing, and franchise arrangements with Nepali companies. Under FITTA regulations, all technology transfer and franchise contracts must be approved and registered with the Department of Industries (DOI) to ensure legal enforceability and permit the legitimate repatriation of royalties and franchise fees through banking channels.",
    category: "Intellectual Property",
  },
  {
    id: "property-verification",
    question: "What legal due diligence is required before purchasing real estate or land in Nepal?",
    answer:
      "Real estate due diligence in Nepal involves verifying titles at the relevant Land Revenue Office (Malpot Karyalaya). Key verification steps include:\n\n• Checking the Land Ownership Certificate (Lalpurja) and tracing back chain of title.\n• Reviewing the cadastral map (Naxa) and field book at the Survey Office (Napi Karyalaya).\n• Verifying that the property is free from encumbrances, bank mortgages, or court injunctions (Rokka).\n• Confirming property tax clearance and adherence to road expansion or river setback regulations.",
    category: "Property Law",
  },
  {
    id: "divorce-family-law",
    question: "What are the procedures for divorce under Nepal's National Civil Code?",
    answer:
      "Under the National Civil Code 2074 (2017), divorce may be granted either by mutual consent or upon specific statutory grounds (such as continuous separation for three or more years, cruelty, adultery, or failure to provide maintenance).\n\nMutual consent divorces can be concluded expeditiously through District Court conciliation. Contested cases undergo a mandatory conciliation process before proceeding to trial for adjudication of partition of matrimonial property and child custody.",
    category: "Family Law",
  },
  {
    id: "consultation-booking-fees",
    question: "How does Kanooni Astra conduct client consultations, and what is your fee structure?",
    answer:
      "We provide initial legal consultations both in person at our Kathmandu office (Ghattekulo marg) and virtually via Google Meet or Zoom for international or remote clients.\n\nOur fee structure is transparent and discussed upfront. We provide fixed-price quotes for standard transactional matters (incorporation, trademark filing, contract drafting), hourly rates for court litigation, and tailored monthly retainers for corporate clients requiring continuous legal counsel.",
    category: "General",
  },
];

const FAQPage = async () => {
  let faqs: FAQItem[] = [];

  try {
    await connectToDatabase();
    const dbFaqs = await FAQModel.find({ status: "published" })
      .sort({ displayOrder: 1 })
      .lean();

    if (dbFaqs && dbFaqs.length > 0) {
      faqs = dbFaqs.map((faq) => ({
        id: String(faq._id),
        question: faq.question,
        answer: faq.answer,
        category: faq.category || "General",
      }));
    }
  } catch {
    // If DB is offline during build or static generation, fall back to curated defaults
  }

  if (faqs.length === 0) {
    faqs = DEFAULT_FAQS;
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://kanooniastra.com" },
      { "@type": "ListItem", position: 2, name: "FAQ", item: "https://kanooniastra.com/faq" },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50/60 py-12 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-semibold">FAQ</li>
          </ol>
        </nav>

        {/* Page Hero Header */}
        <header className="max-w-3xl mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Find clear, advocate-reviewed answers to common legal inquiries, regulatory procedures, and court matters in Nepal.
          </p>
        </header>

        {/* Interactive FAQ Client Section */}
        <FAQClientPage initialFaqs={faqs} />
      </div>
    </main>
  );
};

export default FAQPage;
