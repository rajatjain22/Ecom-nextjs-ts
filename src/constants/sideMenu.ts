import { DashboardIcon, OrdersIcon } from "@/components/Icons";
import { signOut } from "next-auth/react";
import { SideMenuItem } from "@/components/layout/Sidebar/types";
import HomeIcon from "@/components/Icons/Home.icon";
import UsersIcon from "@/components/Icons/Users.icon";

export const sideMenu: SideMenuItem[] = [
  {
    icon: HomeIcon,
    label: "Dashboard",
    route: "/admin",
  },
  {
    icon: OrdersIcon,
    label: "Orders",
    route: "/admin/orders"
  },
  {
    icon: DashboardIcon,
    label: "Products",
    route: "/admin/products",
    badge: 5,
  },
  {
    icon: UsersIcon,
    label: "Customers",
    route: "/admin/customers",
  },
  {
    icon: DashboardIcon,
    label: "Category",
    route: "#",
    children: [
      { label: "Add Careers's", route: "/admin/careers/addCareers" },
      { label: "View Careers's", route: "/admin/careers" },
    ],
  },
  {
    icon: DashboardIcon,
    label: "Discount",
    route: "/admin/discounts",
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
