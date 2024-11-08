import React, { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  label: string;
  route: string;
}

interface SidebarDropdownProps {
  item: MenuItem[];
}

const SidebarDropdown: React.FC<SidebarDropdownProps> = memo(({ item }) => {
  const pathname = usePathname();

  return (
    <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
      {item.map((menuItem, index) => (
        <li key={index}>
          <Link
            href={menuItem.route}
            className={`group relative flex items-center gap-2.5 rounded-md px-10 duration-300 ease-in-out hover:text-white ${
              pathname === menuItem.route ? "text-black" : "text-gray-600"
            }`}
          >
            {menuItem.label}
          </Link>
        </li>
      ))}
    </ul>
  );
});

export default SidebarDropdown;
