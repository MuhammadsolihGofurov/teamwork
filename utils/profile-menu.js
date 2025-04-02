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
  MyOrdersUnPublishedUrl,
  MyOrdersUrl,
  MyTasksArchiveUrl,
  MyTasksCancelUrl,
  MyTasksFinishedUrl,
  MyTasksOffersUrl,
  MyTasksOnAgreementUrl,
  MyTasksUrl,
  PhysicalInfoUrl,
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

export const TasksMenu = [
  {
    id: 1,
    name: "Faol buyurtmalar",
    url: MyTasksUrl,
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
  {
    id: 6,
    name: "Arxivlangan",
    url: MyTasksArchiveUrl,
    role: EXPERT,
    additional_url: false,
  },
];

export const OrdersMenu = [
  {
    id: 1,
    name: "Chop etilgan",
    url: MyOrdersUrl,
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
