import { SearchIcon } from "@/components/Icons";
import React from "react";

const SearchInput: React.FC = () => {
    return (
        <div className="bg-[#e8e8e88f] flex px-4 py-3 rounded-md text-left mt-4">
            <SearchIcon />
            <input
                type="email"
                placeholder="Search..."
                className="w-full outline-none bg-transparent text-gray-600 text-[15px]"
            />
        </div>
    );
};

export default SearchInput