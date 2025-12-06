import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./styles/scss/global.scss";
import "./styles/global.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Header } from "./components/common/header";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  weight: ["300", "600", "800"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Rest countries API",
    default: "Rest countries API",
  },
  description:
    "A challenge by front end mentor displaying countries from an API with their descriptions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.variable} antialiased`}>
        <Header />
        <main className="grid items-center grow">{children}</main>
      </body>
    </html>
  );
}
