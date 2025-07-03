import { Calendar, LucideIcon, Receipt, UserRoundCheck } from "lucide-react";

export interface SubNavigation {
  label: string;
  path: string;
}

export interface Navigation {
  label: string;
  path: string;
  icon: LucideIcon;
  description: string;
  subNavigations: SubNavigation[];
  pathActive: string[];
}

const styleNavigate =
  "whitespace-nowrap inline-block px-2 py-1 text-base font-semibold tracking-tight text-white rounded-lg hover:text-white transition ease-in";

const navigations: Navigation[] = [
  {
    label: "Trang chủ",
    path: "/",
    icon: UserRoundCheck,
    description: "Trang chủ",
    pathActive: [
      "/",
    ],
    subNavigations: [
    ],
  },
  {
    label: "Quỹ đội",
    path: "/fund",
    icon: Receipt,
    description: "Quỹ đội",
    pathActive: [
      "/fund",
    ],
    subNavigations: [
    ],
  },
  {
    label: "Lịch thi đấu",
    path: "/schedule",
    icon: Calendar,
    description: "Lịch thi đấu",
    pathActive: [
      "/schedule",
    ],
    subNavigations: [
    ],
  }
];

export { navigations, styleNavigate };
