import { DashboardIcon, OrdersIcon, ProductIcon } from "@/components/Icons";
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
    icon: ProductIcon,
    label: "Products",
    route: "/admin/products",
    children: [
      { label: "Category", route: "/admin/products/category" },
      { label: "Brand", route: "/admin/products/brands" },
      { label: "Collection", route: "/admin/products/collections" },
    ],
  },
  {
    icon: UsersIcon,
    label: "Customers",
    route: "/admin/customers",
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
