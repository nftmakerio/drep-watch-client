import { type StaticImageData } from "next/image";

export type DeviceType = "mobile" | "tablet" | "desktop" | "monitor";

export interface UserType {
    username: string;
    walletId: string;
    questionsAnswered: number;
    totalQuestions: number;
    img: string | StaticImageData;
}
