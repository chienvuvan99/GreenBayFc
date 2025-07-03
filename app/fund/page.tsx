"use client";
import { useSheetData } from "@/context/SheetDataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, XCircle, MinusCircle, Wallet } from "lucide-react";
import CounterUp from "@/components/ui/counterUp";
// import Head from "next/head";

interface SheetDataItem {
  [key: string]: string | number | boolean;
}

type Month =
  | "Tháng 7"
  | "Tháng 8"
  | "Tháng 9"
  | "Tháng 10"
  | "Tháng 11"
  | "Tháng 12";

export default function FundPage() {
  const { sheet2Data, sheet3Data, loading, error } = useSheetData();

  const table1 = sheet2Data.map(
    ({
      Name,
      July,
      August,
      September,
      October,
      November,
      December,
    }: SheetDataItem) => ({
      Name,
      July,
      August,
      September,
      October,
      November,
      December,
    })
  );

  const table2 = sheet2Data
    .map(({ Date, Description, Total }: SheetDataItem) => ({
      Date,
      Description,
      Total,
    }))
    .filter(({ Date, Description, Total }: SheetDataItem) => {
      const isNonEmpty = (value: unknown) =>
        typeof value === "string" && value.trim() !== "";
      return isNonEmpty(Date) || isNonEmpty(Description) || isNonEmpty(Total);
    });
  const getPaymentStatus = (value: string | number | boolean) => {
    if (value === "1" || value === 1)
      return {
        paid: true,
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      };
    if (value === "2" || value === 2)
      return {
        paid: false,
        icon: <XCircle className="w-5 h-5 text-gray-500" />,
      };
    return {
      paid: false,
      icon: <MinusCircle className="w-5 h-5 text-red-500" />,
    };
  };

  const getValue = (label: string, month: Month): string | null => {
    const row = sheet3Data.find(
      (item: SheetDataItem) => item["Trận"] === label
    );
    return row ? (row[month] as string) : null;
  };

  // Extract values for "Tổng thu quỹ + thu đối", "Tổng chi", and "Còn lại"
  const month: Month = "Tháng 7";

  // Helper function to get and convert values to numbers
  const getNumericValue = (label: string, month: Month): number => {
    const value = getValue(label, month);
    return value ? parseFloat(value) : 0;
  };

  // Retrieve and convert values
  const previousFund = getNumericValue(
    "Quỹ đội dự tính đến hết T6/2024",
    month
  );
  const totalFundIncome = getNumericValue("Tổng thu quỹ + thu đối", month);
  const totalExpense = getNumericValue("Tổng chi", month);
  const remainingBalance = getNumericValue("Còn lại", month);

  // Calculate total fund
  const totalFund = previousFund + totalFundIncome;

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-8 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {/* <Head>
        <title>Quỹ đội - FireAnt Football Club</title>
        <meta name="description" content="Trang thông tin chi tiết về quỹ đội của FireAnt Football Club." />
        <meta name="keywords" content="quỹ đội, FireAnt Football Club, bóng đá, tài chính" />
        <meta property="og:title" content="Quỹ đội - FireAnt Football Club" />
        <meta property="og:description" content="Trang thông tin chi tiết về quỹ đội của FireAnt Football Club." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/Thumbnail_website.png" />
      </Head> */}
      <div className="flex flex-col gap-10 items-center mt-10 p-2 sm:p-6 text-[#1F1F41]">
        <div className="flex gap-10">
          <div className="flex flex-col gap-10">
            <Card className="p-6 h-fit">
              <CardHeader className="p-0">
                <CardTitle className="text-2xl font-bold">
                  FireAnt Football Club
                </CardTitle>
              </CardHeader>
              <CardContent className="flex py-6 px-0 gap-4 justify-center">
                <Card className="p-4 bg-[#F6F6FF] flex flex-col gap-3">
                  <CardTitle className="">Tổng quỹ</CardTitle>
                  <CardContent className="flex items-center gap-2">
                    <Wallet className="text-[#FBBF24] w-7 h-7" />
                    <p className="text-2xl font-bold"></p>
                    <p>
                      <CounterUp
                        start={1}
                        end={totalFund}
                        duration={2000}
                        className="text-[32px] leading-10 font-bold text-[#1F1F41]"
                      />
                    </p>
                  </CardContent>
                </Card>
                <Card className="p-4 bg-[#F6F6FF] flex flex-col gap-3">
                  <CardTitle>Tổng chi</CardTitle>
                  <CardContent className="flex items-center gap-2">
                    <Wallet className="text-[#FBBF24] w-7 h-7" />
                    <p className="text-2xl font-bold"></p>
                    <p>
                      <CounterUp
                        end={totalExpense ? totalExpense : 0}
                        className="text-[32px] leading-10 font-bold text-[#1F1F41]"
                      />
                    </p>
                  </CardContent>
                </Card>
                <Card className="p-4 bg-[#F6F6FF] flex flex-col gap-3">
                  <CardTitle className="">Còn lại</CardTitle>
                  <CardContent className="flex items-center gap-2">
                    <Wallet className="text-[#FBBF24] w-7 h-7" />
                    <p className="text-2xl font-bold"></p>
                    <p>
                      <CounterUp
                        end={remainingBalance}
                        className="text-[32px] leading-10 font-bold "
                      />
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
              <p className="text-sm text-gray-500">*Đơn vị triệu đồng</p>
            </Card>

            <Card className="overflow-x-auto xl:w-[1000px] scrollbar-hide">
              <CardHeader className="bg-primary text-primary-foreground">
                <CardTitle className="text-2xl font-bold text-center">
                  Quỹ đội
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="font-bold">Tên</TableHead>
                        <TableHead className="font-bold text-center">
                          Tháng 7
                        </TableHead>
                        <TableHead className="font-bold text-center">
                          Tháng 8
                        </TableHead>
                        <TableHead className="font-bold text-center">
                          Tháng 9
                        </TableHead>
                        <TableHead className="font-bold text-center">
                          Tháng 10
                        </TableHead>
                        <TableHead className="font-bold text-center">
                          Tháng 11
                        </TableHead>
                        <TableHead className="font-bold text-center">
                          Tháng 12
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {table1.map((row: SheetDataItem, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {row.Name}
                          </TableCell>
                          {[
                            "July",
                            "August",
                            "September",
                            "October",
                            "November",
                            "December",
                          ].map((month) => {
                            const status = getPaymentStatus(row[month]);
                            return (
                              <TableCell key={month} className="text-center">
                                <div className="flex items-center justify-center">
                                  {status.icon}
                                </div>
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Nội dung chi từ 7-2024
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ngày</TableHead>
                      <TableHead>Nội dung chi</TableHead>
                      <TableHead>Số tiền</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {table2.map((row: SheetDataItem, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{row.Date}</TableCell>
                        <TableCell>{row.Description}</TableCell>
                        <TableCell>{row.Total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
