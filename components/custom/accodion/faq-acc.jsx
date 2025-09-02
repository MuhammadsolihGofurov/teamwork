import fetcher from "@/utils/fetcher";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import useSWR from "swr";

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);
  const router = useRouter();
  const intl = useIntl();

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const { data: faqs, isValidating } = useSWR(
    [`/questions/list`, router.locale],
    (url) =>
      fetcher(
        url,
        {
          headers: {
            "Accept-Language": router.locale,
          },
        },
        {},
        true
      )
  );

  return (
    <div className="container flex flex-col items-center gap-7 sm:gap-10">
      <h2 className="text-xl sm:text-2xl font-bold text-primary text-center pt-10 sm:pt-5">
        {intl.formatMessage({ id: "FAQ — Ko‘p so‘raladigan savollar" })}
      </h2>
      <div className="flex flex-col gap-3 w-full sm:w-2/3">
        {faqs?.data?.map((faq, index) => (
          <div
            key={index}
            className="border border-bg-3 rounded-lg shadow-sm bg-white"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex items-center justify-between w-full p-4 text-left text-primary font-medium hover:bg-gray-50 transition-colors rounded-2xl"
            >
              {faq.question}
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="p-4 pt-0 text-gray-600 animate-fadeIn">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
