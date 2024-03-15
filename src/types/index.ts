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
  question_id: number;
}

export interface Answer {
  id: number;
  answer: string;
  question_id: number;
  drep_id: string;
}

export interface Drep {
  drep_id: string;
  created_at: string;
  name: string;
  email: string;
}
