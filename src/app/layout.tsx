import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { Metadata } from "next"; 
import { Plus_Jakarta_Sans } from "next/font/google";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Yashith Sasmitha | Portfolio",
  description: "Software Engineer and Consultant specializing in banking architecture.",
  icons: {
    icon: "images/logo/yslogo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${font.variable} font-sans bg-[#020617] text-slate-200 antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}