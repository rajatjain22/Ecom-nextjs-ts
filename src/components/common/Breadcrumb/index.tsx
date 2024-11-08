import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const generateBreadcrumbs = (pathname: string) => {
  const pathParts = pathname.split("/").filter(Boolean);
  const breadcrumbs: { label: string; href: string }[] = [];
  let pathAccumulator = "";

  pathParts.forEach((part, index) => {
    pathAccumulator += "/" + part;

    if (index === pathParts.length - 1) {
      breadcrumbs.push({
        label: part.charAt(0).toUpperCase() + part.slice(1),
        href: "",
      });
    } else {
      breadcrumbs.push({
        label: part.charAt(0).toUpperCase() + part.slice(1),
        href: pathAccumulator,
      });
    }
  });

  return breadcrumbs;
};

const Breadcrumb: React.FC = () => {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <li key={index} className="inline-flex items-center">
              {!isLast ? (
                <Link
                  href={item.href}
                  className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-primary"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-sm font-medium text-gray-500">
                  {item.label}
                </span>
              )}

              {!isLast && (
                <svg
                  className="w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
