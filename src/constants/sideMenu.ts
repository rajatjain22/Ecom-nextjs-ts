import { DashboardIcon } from "@/components/Icons";
import { signOut } from "next-auth/react";
import { SideMenuItem } from "@/components/layout/Sidebar/types";

export const sideMenu: SideMenuItem[] = [
  {
    icon: DashboardIcon,
    label: "Dashboard",
    route: "/admin",
  },
  {
    icon: DashboardIcon,
    label: "Products",
    route: "/admin/products",
    badge: 5,
  },
  {
    icon: DashboardIcon,
    label: "Customers",
    route: "/admin/customers",
  },
  {
    icon: DashboardIcon,
    label: "Careers's",
    route: "#",
    children: [
      { label: "Add Careers's", route: "/admin/careers/addCareers" },
      { label: "View Careers's", route: "/admin/careers" },
    ],
  },
];

export const sideMenuBottom: SideMenuItem[] = [
  {
    icon: DashboardIcon,
    label: "Logout",
    route: "#",
    onClick: async (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      await signOut();
    },
  },
];
