import { type StaticImageData } from "next/image";

export type DeviceType = "mobile" | "tablet" | "desktop" | "monitor";

export interface UserType {
  name: string;
  walletId: string;
  questionsAnswers: number;
  questionsAsked: number;
  img: string | StaticImageData;
}

export interface DrepType {
  name: string;
  walletId: string;
  questionsAnswers: number;
  questionsAsked: number;
  img: string | StaticImageData;
  drep_id: string;
}

export interface Question {
  id: number;
  theme: string;
  question_title: string;
  question_description: string;
  wallet_address: string;
  drep_id: string;
  question_id: string;
  uuid: string;
}

export interface Answer {
  id: number;
  answer: string;
  uuid: string;
  drep_id: string;
}

export interface Drep {
  drep_id: string;
  created_at: string;
  name: string;
  email: string;
}

export interface Notification {
  id: string;
  created_at: string;
  opened: boolean;
  role: string;
  uuid: string;
  user: string;
  drep: string;
  questions: {
    uuid: string;
    question_title: string;
  };
  answer: string;
}

export interface Proposal {
  id: string;
  created_at: string;
  title: string;
  description: string;
  agreed: string[];
  not_agreed: string[];
  category: string;
  ada_amount: number;
  catalyst_link: string;
  fund_no: number;
}
