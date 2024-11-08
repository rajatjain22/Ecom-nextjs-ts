import React, { memo } from "react";
import { footerLinks } from "@/constants/footer";
import FooterLinkGroup from "./FooterLinkGroup";
import SearchInput from "@/components/common/SearchInput";

const Footer: React.FC = memo(() => {
    return (
        <footer className="bg-white py-12 px-8 font-sans tracking-wide">
            <div className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-5 lg:gap-14 max-lg:gap-8">
                <div className="lg:col-span-2">
                    <h4 className="text-lg font-bold mb-6 text-[#333]">About Us</h4>
                    <p className="text-gray-600 text-[15px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida, mi eu pulvinar cursus, sem elit interdum mauris.
                    </p>
                    <SearchInput />
                </div>

                {Object.entries(footerLinks).map(([title, links]) => (
                    <FooterLinkGroup key={title} title={title} links={links} />
                ))}
            </div>
        </footer>
    );
});

export default Footer;
