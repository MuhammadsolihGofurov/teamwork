import { useParams } from "@/hooks/useParams";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import {
  ExpertBio,
  ExpertComment,
  ExpertHistory,
  ExpertPortoflio,
} from "./expert-tab-content";

export default function ExpertTabItems({ about, portfolio, comments }) {
  const { updateParams, findParams } = useParams();
  const [activeTab, setActiveTab] = useState("bio");
  const intl = useIntl();

  const tabs = [
    {
      id: 1,
      name: intl.formatMessage({ id: "Bio" }),
      value: "bio",
    },
    {
      id: 2,
      name: intl.formatMessage({ id: "Portfolio" }),
      value: "portfolio",
    },
    {
      id: 3,
      name: intl.formatMessage({ id: "Buyurtmalar tarixi" }),
      value: "history",
    },
    {
      id: 4,
      name: intl.formatMessage({ id: "Sharxlar" }),
      value: "comment",
    },
  ];

  useEffect(() => {
    if (findParams("tab")) {
      setActiveTab(findParams("tab"));
    } else {
      setActiveTab("bio");
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="sm:flex hidden items-center gap-1 border border-bg-3 rounded-lg">
        {tabs?.map((item) => {
          return (
            <button
              key={item?.name}
              onClick={() => {
                setActiveTab(item?.value);
                updateParams("tab", item?.value);
              }}
              type="button"
              className={`py-3 px-5 rounded-lg font-medium hover:text-main transition-colors duration-150 ${
                activeTab == item?.value ? "text-main" : "text-primary"
              }`}
            >
              {item?.name}
            </button>
          );
        })}
      </div>
      {/* tab content */}
      <div className="sm:block hidden">
        {activeTab == "bio" ? <ExpertBio about={about} /> : <></>}
        {activeTab == "portfolio" ? (
          <ExpertPortoflio portfolio={portfolio} />
        ) : (
          <></>
        )}
        {activeTab == "history" ? <ExpertHistory history={[]} /> : <></>}
        {activeTab == "comment" ? <ExpertComment comments={comments} /> : <></>}
      </div>
      <div className="flex sm:hidden flex-col gap-5">
        <ExpertBio about={about} />
        <ExpertPortoflio portfolio={portfolio} />
        <ExpertHistory history={[]} />
        <ExpertComment comments={comments} />
      </div>
    </div>
  );
}
