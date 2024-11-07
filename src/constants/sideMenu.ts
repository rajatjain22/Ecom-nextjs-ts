import { SideMenuItem } from "@/interfaces/components";
import dashboard from "@/assets/svg/dashboard.svg"
import { signOut } from "next-auth/react";

export const sideMenu: SideMenuItem[] = [
    {
        icon: dashboard,
        label: "Dashboard",
        route: "/admin",
    },
    {
        icon: dashboard,
        label: "Products",
        route: "/admin/products",
        badge: 5,
    },
    {
        icon: dashboard,
        label: "Customers",
        route: "/admin/customers",
    },
    {
        icon: dashboard,
        label: "Careers's",
        route: "#",
        children: [
            { label: "Add Careers's", route: "/admin/careers/addCareers" },
            { label: "View Careers's", route: "/admin/careers" },
        ]
    },

];

export const sideMenuBottom: SideMenuItem[] = [
    {
        icon: dashboard,
        label: "Logout",
        route: "#",
        onClick: async (event: React.MouseEvent<HTMLAnchorElement>) => {
            event.preventDefault();
            await signOut();
        }
    },
]