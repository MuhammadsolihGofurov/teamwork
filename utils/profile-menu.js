import { CUSTOMER, EXPERT } from "./data";
import {
  AdditionInfoUrl,
  BioInfoUrl,
  InfoEditUrl,
  InfoUrl,
  LegalInfoUrl,
  MyOrdersArchiveUrl,
  MyOrdersOnAgreementUrl,
  MyOrdersOnProcessUrl,
  MyOrdersPublishedUrl,
  MyOrdersUnPublishedUrl,
  MyOrdersUrl,
  MyOrdersViewExpertsUrl,
  MyOrdersViewIdUrl,
  MyOrdersViewOffersUrl,
  MyOrdersViewSavedUrl,
  MyPaymentIncomeUrl,
  MyPaymentOutgoingsUrl,
  MyPaymentUrl,
  MyRatesAllUrl,
  MyRatesNegativeUrl,
  MyRatesNeutralUrl,
  MyRatesPositiveUrl,
  MyTaskPublishedUrl,
  MyTasksArchiveUrl,
  MyTasksCancelUrl,
  MyTasksFinishedUrl,
  MyTasksOffersUrl,
  MyTasksOnAgreementUrl,
  MyTasksUrl,
  PhysicalInfoUrl,
  ResumeAchievementsUrl,
  ResumeExperienceUrl,
  ResumeSkillsUrl,
  ResumeUrl,
  SavedExpertsUrl,
  SavedTasksUrl,
} from "./router";

export const InfoMenu = [
  {
    id: 1,
    name: "Asosiy ma'lumotlar",
    url: InfoEditUrl,
    role: "all",
    additional_url: InfoUrl,
  },
  {
    id: 2,
    name: "Qo’shimcha ma’lumotlar",
    url: AdditionInfoUrl,
    role: EXPERT,
    additional_url: false,
  },
  {
    id: 3,
    name: "BIO",
    url: BioInfoUrl,
    role: EXPERT,
    additional_url: false,
  },
  {
    id: 4,
    name: "Jismoniy shaxs",
    url: PhysicalInfoUrl,
    role: CUSTOMER,
    additional_url: false,
  },
  {
    id: 5,
    name: "Yuridik shaxs",
    url: LegalInfoUrl,
    role: CUSTOMER,
    additional_url: false,
  },
];

export const ResumeMenu = [
  {
    id: 1,
    name: "Ta'lim",
    url: ResumeUrl,
    role: EXPERT,
    additional_url: false,
  },
  {
    id: 2,
    name: "Tajriba",
    url: ResumeExperienceUrl,
    role: EXPERT,
    additional_url: false,
  },
  {
    id: 3,
    name: "Ko'nikmalar",
    url: ResumeSkillsUrl,
    role: EXPERT,
    additional_url: false,
  },
  {
    id: 4,
    name: "Yutuqlar",
    url: ResumeAchievementsUrl,
    role: EXPERT,
    additional_url: false,
  },
];

export const TasksMenu = [
  {
    id: 1,
    name: "Faol buyurtmalar",
    url: MyTaskPublishedUrl,
    role: EXPERT,
    additional_url: false,
  },
  {
    id: 2,
    name: "Takliflar",
    url: MyTasksOffersUrl,
    role: EXPERT,
    additional_url: false,
  },
  {
    id: 3,
    name: "Kelishuv arafasida",
    url: MyTasksOnAgreementUrl,
    role: EXPERT,
    additional_url: false,
  },
  {
    id: 4,
    name: "Yakunlangan",
    url: MyTasksFinishedUrl,
    role: EXPERT,
    additional_url: false,
  },
  {
    id: 5,
    name: "Rad etilgan",
    url: MyTasksCancelUrl,
    role: EXPERT,
    additional_url: false,
  },
  // {
  //   id: 6,
  //   name: "Arxivlangan",
  //   url: MyTasksArchiveUrl,
  //   role: EXPERT,
  //   additional_url: false,
  // },
];

export const OrdersMenu = [
  {
    id: 0,
    name: "Barchasi",
    url: MyOrdersUrl,
    role: CUSTOMER,
    additional_url: false,
  },
  {
    id: 1,
    name: "Chop etilgan",
    url: MyOrdersPublishedUrl,
    role: CUSTOMER,
    additional_url: false,
  },
  {
    id: 2,
    name: "Bajarilmoqda",
    url: MyOrdersOnProcessUrl,
    role: CUSTOMER,
    additional_url: false,
  },
  {
    id: 3,
    name: "Kelishuv arafasida",
    url: MyOrdersOnAgreementUrl,
    role: CUSTOMER,
    additional_url: false,
  },
  {
    id: 4,
    name: "Chop etilmagan",
    url: MyOrdersUnPublishedUrl,
    role: CUSTOMER,
    additional_url: false,
  },
  {
    id: 5,
    name: "Arxivlangan",
    url: MyOrdersArchiveUrl,
    role: CUSTOMER,
    additional_url: false,
  },
];

export const MySingleOrderMenu = [
  {
    id: 1,
    name: "Topshiriq haqida",
    url: MyOrdersViewIdUrl,
    role: CUSTOMER,
    additional_url: false,
  },
  {
    id: 2,
    name: "Takliflar",
    url: MyOrdersViewOffersUrl,
    role: CUSTOMER,
    additional_url: false,
  },
  {
    id: 3,
    name: "Bajaruvchilar",
    url: MyOrdersViewExpertsUrl,
    role: CUSTOMER,
    additional_url: false,
  },
  {
    id: 4,
    name: "Saralanganlar",
    url: MyOrdersViewSavedUrl,
    role: CUSTOMER,
    additional_url: false,
  },
];

export const MySavedMenu = [
  {
    id: 1,
    name: "Topshiriqlar",
    url: SavedTasksUrl,
    role: "all",
    additional_url: false,
  },
  {
    id: 2,
    name: "Mutaxassislar",
    url: SavedExpertsUrl,
    role: "all",
    additional_url: false,
  },
];

export const MyRatesMenu = [
  {
    id: 1,
    name: "Barcha sharxlar",
    url: MyRatesAllUrl,
    role: "all",
    additional_url: false,
  },
  {
    id: 2,
    name: "Ijobiylar",
    url: MyRatesPositiveUrl,
    role: "all",
    additional_url: false,
  },
  {
    id: 3,
    name: "Neytral",
    url: MyRatesNeutralUrl,
    role: "all",
    additional_url: false,
  },
  {
    id: 4,
    name: "Salbiylar",
    url: MyRatesNegativeUrl,
    role: "all",
    additional_url: false,
  },
];

export const ReturnToSoloOffer = [
  {
    id: 1,
    name: "Orqaga",
    url: `${MyOrdersViewOffersUrl}`,
    role: "all",
    additional_url: false,
    icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.33301 8H12.6663M3.33301 8L7.33301 12M3.33301 8L7.33301 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `,
  },
];

export const ReturnToOffers = [
  {
    id: 1,
    name: "Orqaga",
    url: `${MyTasksOffersUrl}`,
    role: "all",
    additional_url: false,
    icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.33301 8H12.6663M3.33301 8L7.33301 12M3.33301 8L7.33301 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `,
  },
];

export const PaymentMenu = [
  {
    id: 1,
    name: "Barcha tranzaksiyalar",
    url: MyPaymentUrl,
    role: "all",
    additional_url: false,
  },
  {
    id: 2,
    name: "Kirim",
    url: MyPaymentIncomeUrl,
    role: "all",
    additional_url: false,
    query: "?type=1",
  },
  {
    id: 3,
    name: "Chiqim",
    url: MyPaymentOutgoingsUrl,
    role: "all",
    additional_url: false,
    query: "?type=2",
  },
];
