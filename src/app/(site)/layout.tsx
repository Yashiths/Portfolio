import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import FloatingThemeToggler from "@/components/Layout/FloatingThemeToggler";
import Footer from "@/components/Layout/Footer";
import { ThemeProvider } from "next-themes";
import ScrollToTop from "@/components/ScrollToTop";
import Aoscompo from "@/utils/aos";

const font = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.variable} font-sans bg-white dark:bg-darkmode text-slate-900 dark:text-slate-200 transition-colors duration-300 min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          enableSystem={true}
          defaultTheme="system"
        >
          <Aoscompo>
            <FloatingThemeToggler />
            <div className="flex-1">
              {children}
            </div>
            <Footer />
          </Aoscompo>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
