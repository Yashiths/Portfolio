import { HeaderItem } from "@/types/menu";

export const headerData: HeaderItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" }, // මෙතන Services වෙනුවට About දාලා path එක /about කරා
  { label: "Portfolio", href: "/#projects" }, // Homepage එකේ ඉඳන් link වෙන නිසා /#projects දාන්න
  { label: "Stack", href: "/#stack" },
  { label: "Contact", href: "/#contact" },
];