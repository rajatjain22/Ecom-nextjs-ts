import React from "react";

function Badge({
  children,
  className = "bg-gray-50 text-gray-600",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex gap-2 items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10 max-h-6 ${className}`}
    >
      {children}
    </span>

    //   <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
    //     Badge
    //   </span>
    //   <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
    //     Badge
    //   </span>
    //   <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
    //     Badge
    //   </span>
    //   <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
    //     Badge
    //   </span>
    //   <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
    //     Badge
    //   </span>
    //   <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
    //     Badge
    //   </span>
    //   <span className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">
    //     Badge
    //   </span>
  );
}

export default Badge;
