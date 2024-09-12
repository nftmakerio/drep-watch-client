import { type StaticImageData } from "next/image";

export type DeviceType = "mobile" | "tablet" | "desktop" | "monitor";

export interface UserType {
  name: string;
  walletId: string;
  questionsAnswers: number;
  questionsAsked: number;
  img: string | undefined;
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
  givenName: string | null;
  image: string | null;
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
  title: string;
  vote: "Abstain" | "No" | "Yes";
}
