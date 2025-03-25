import { CUSTOMER, EXPERT } from "./data";
import {
  AdditionInfoUrl,
  BioInfoUrl,
  InfoEditUrl,
  InfoUrl,
  LegalInfoUrl,
  PhysicalInfoUrl,
} from "./router";

export const InfoMenu = [
  {
    id: 1,
    name: "Asosiy ma'lumotlar",
    url: InfoUrl,
    role: "all",
    additional_url: InfoEditUrl,
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
