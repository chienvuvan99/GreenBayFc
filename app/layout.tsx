import { Open_Sans } from "next/font/google";
import "./globals.css";
import { SheetDataProvider } from "@/context/SheetDataContext";
import { Metadata } from "next";
import ClientLayout from "@/components/layout/ClientLayout";

const openSans = Open_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thống kê mùa giải 2025",
  description: "Bảng thống kê các chỉ số bàn thắng, kiến tạo của mùa giải 2025",
  keywords: ["thống kê", "bóng đá", "mùa giải 2025", "bàn thắng", "kiến tạo"],
  openGraph: {
    title: "Thống kê mùa giải 2025",
    description:
      "Bảng thống kê các chỉ số bàn thắng, kiến tạo của mùa giải 2025",
    type: "website",
    images: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.className} antialiased`}>
        <SheetDataProvider>
          <ClientLayout>{children}</ClientLayout>
        </SheetDataProvider>
      </body>
    </html>
  );
}
