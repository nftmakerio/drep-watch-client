import { type StaticImageData } from "next/image";

export type DeviceType = "mobile" | "tablet" | "desktop" | "monitor";

export interface UserType {
    name: string;
    walletId: string;
    questionsAnswers: number;
    questionsAsked: number;
    img: string | StaticImageData;
}
