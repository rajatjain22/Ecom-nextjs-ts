import { sideMenu, sideMenuBottom } from "@/constants/sideMenu";
import { useState } from "react";
import SidebarItem from "./SidebarItem";
import { SidebarType } from "./types";



const Sidebar: React.FC<SidebarType> = ({ sidebarOpen, setSidebarOpen }) => {
  const [pageName, setPageName] = useState<string>('')
  const handleClose = () => {
    setSidebarOpen(presVal => !presVal);
  };

  return (
    <aside className={`z-10 -translate-x-full max-w-[--w-side] md:w-full h-screen fixed top-0 left-0 w-full flex flex-col bg-white rounded-xl p-4 shadow-xl transition-transform duration-300 ease-in-out ${sidebarOpen ? '!translate-x-0' : '!-translate-x-full'}`}>
      <header className="relative p-4 mb-2">
        <h5 className="text-xl font-semibold leading-snug text-blue-gray-900">RAJAt</h5>
        <button
          aria-label="Close Sidebar"
          onClick={handleClose}
          className="absolute -right-6 top-5 h-6 w-6 p-[6px] flex items-center justify-center bg-primary rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" className="w-4 h-4" viewBox="0 0 55.752 55.752">
            <path d="M43.006 23.916a5.36 5.36 0 0 0-.912-.727L20.485 1.581a5.4 5.4 0 0 0-7.637 7.638l18.611 18.609-18.705 18.707a5.398 5.398 0 1 0 7.634 7.635l21.706-21.703a5.35 5.35 0 0 0 .912-.727 5.373 5.373 0 0 0 1.574-3.912 5.363 5.363 0 0 0-1.574-3.912z" />
          </svg>
        </button>
      </header>

      <ul aria-label="Main Navigation" className="flex-1 gap-1 p-2 font-sans text-base text-blue-gray-700">
        {sideMenu.map((menuItem, index) => (
          <SidebarItem key={index} item={menuItem} pageName={pageName} setPageName={setPageName} />
        ))}
      </ul>

      <ul aria-label="Main Navigation" className=" gap-1 font-sans text-base text-blue-gray-700">
        {sideMenuBottom.map((menuItem, index) => (
          <SidebarItem key={index} item={menuItem} pageName={pageName} setPageName={setPageName} />
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar;