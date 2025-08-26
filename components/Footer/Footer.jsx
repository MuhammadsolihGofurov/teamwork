import { useIntl } from "react-intl";
import { Socials } from "../custom";
import {
  AboutUsUrl,
  AddAdsUrl,
  ExpertsUrl,
  FaqsUrl,
  HelpUrl,
  OffersSecurityUrl,
  OffersTermsUrl,
  SearchOrders,
  TasksCreateUrl,
  TasksUrl,
} from "@/utils/router";
import { NextLink } from "../Utils";
import { TEAMWORK_EMAIL, TEAMWORK_PHONE } from "@/utils/data";

export default function Footer() {
  const intl = useIntl();

  const menu = [
    {
      id: 1,
      name: intl.formatMessage({ id: "addAd" }),
      url: TasksCreateUrl,
    },
    {
      id: 2,
      name: intl.formatMessage({ id: "Oferta shartlari" }),
      url: OffersTermsUrl,
    },
    {
      id: 3,
      name: intl.formatMessage({ id: "Buyurtmalarni qidirish" }),
      url: TasksUrl,
    },
    {
      id: 4,
      name: intl.formatMessage({ id: "Tez-tez so'raladigan savollar" }),
      url: FaqsUrl,
    },
    {
      id: 5,
      name: intl.formatMessage({ id: "Mutaxassislar" }),
      url: ExpertsUrl,
    },
    {
      id: 6,
      name: intl.formatMessage({ id: "Bitim xavfsizligi" }),
      url: OffersSecurityUrl,
    },
  ];

  const bottomLinks = [
    {
      id: 1,
      name: intl.formatMessage({ id: "Copyright" }),
      url: "#",
    },
    // {
    //   id: 2,
    //   name: intl.formatMessage({ id: "Biz haqimizda" }),
    //   url: AboutUsUrl,
    // },
    // {
    //   id: 3,
    //   name: intl.formatMessage({ id: "Yordam" }),
    //   url: HelpUrl,
    // },
    {
      id: 4,
      name: "Toshkent shahri, Temur Malik dahasi, Farobiy ko'chasi 150A",
      url: "#",
    },
  ];

  return (
    <footer className="sm:flex hidden flex-col text-primary">
      <div className="footer__top py-10">
        <div className="container">
          <h6 className="uppercase font-normal text-lg">
            <span
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage({ id: "Teamwork footer text" }),
              }}
            />
          </h6>
          <div className="flex items-start gap-10 pt-6">
            <Socials />
            <div className="flex flex-col">
              <div className="grid grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-1">
                {menu?.map((item, index) => {
                  return (
                    <div key={index}>
                      <NextLink
                        url={item?.url}
                        className={
                          "font-normal hover:text-main transition-colors duration-150"
                        }
                      >
                        {item?.name}
                      </NextLink>
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 pt-3">
                <div>
                  <a
                    href={`tel: ${TEAMWORK_PHONE}`}
                    role="link"
                    className="font-normal hover:text-main transition-colors duration-150"
                    title={TEAMWORK_PHONE}
                  >
                    {TEAMWORK_PHONE}
                  </a>
                </div>
                <div>
                  <a
                    href={`mailto: ${TEAMWORK_EMAIL}`}
                    role="link"
                    className="font-normal text-blue hover:text-main transition-colors duration-150"
                    title={TEAMWORK_EMAIL}
                  >
                    {TEAMWORK_EMAIL}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom py-6 border-t border-t-bg-3">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-6">
            {bottomLinks?.map((item, index) => {
              return (
                <NextLink
                  key={index}
                  url={item?.url}
                  className={
                    "font-normal hover:text-main transition-colors duration-150"
                  }
                >
                  {item?.name}
                </NextLink>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
