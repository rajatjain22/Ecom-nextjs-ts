import React, { memo } from "react";
import Link from "next/link";
import { FooterLink } from "./types";

interface FooterLinkGroupProps {
    title: string;
    links: FooterLink[];
}

const FooterLinkGroup: React.FC<FooterLinkGroupProps> = memo(({ title, links }) => {
    const formattedTitle = title.replace(/([A-Z])/g, " $1").trim();

    return (
        <div>
            <h4 className="text-lg font-bold mb-6 text-[#333]">{formattedTitle}</h4>
            <ul className="space-y-4">
                {links.map((link) => (
                    <li key={link.name}>
                        <Link href={link.path} className="text-gray-600 hover:text-blue-600 text-[15px]">
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default FooterLinkGroup;