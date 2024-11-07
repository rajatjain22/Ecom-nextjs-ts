import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarDropdown from "./SidebarDropdown";
import { SideMenuItem } from "./types";
import Image from "next/image";

interface SidebarItemProps {
  item: SideMenuItem;
  pageName: string;
  setPageName: (page: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, pageName, setPageName }) => {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility

  const isActive = (item: SideMenuItem): boolean => {
    if (item.route === pathname) return true;
    if (item.children) {
      return item.children.some((child) => isActive(child));
    }
    return false;
  };

  const isItemActive = isActive(item);

  const handleToggleDropdown = () => {
    if (item.children) {
      setIsDropdownOpen((prev) => !prev); // Toggle dropdown if there are children
    }
    setPageName(item.label); // Set the page name on click
  };

  return (
    <li>
      <Link
        href={item.route || "#"}
        onClick={(e) => {
          if (item.children) {
            e.preventDefault();
            handleToggleDropdown();
          }
        }}
        className={`${isItemActive ? "bg-primary text-white" : ""} relative flex items-center w-full p-1 rounded-lg hover:bg-blue-gray-50 hover:text-blue-gray-900`}
        aria-current={isItemActive ? "page" : undefined}
      >
        <Image
          src={item?.icon?.src || ""}
          alt="Icon"
          width={15}
          height={15}
          className="m-2"
        />
        {item.label}
        {item.children && (
          <svg
            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${isDropdownOpen ? "rotate-180" : ""}`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
              fill="currentColor"
            />
          </svg>
        )}
        {item.badge && (
          <span className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
            {item.badge}
          </span>
        )}
      </Link>

      {item.children && isDropdownOpen && (
        <div
          className={`transform transition-all duration-300 ease-in-out overflow-hidden max-h-[1000px]`}
        >
          <SidebarDropdown item={item.children} />
        </div>
      )}
    </li>
  );
};

export default SidebarItem;
