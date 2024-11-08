import React from "react";
import { PlatformNameTypes, SocialButtonTypes, SocialPlatformTypes } from "./button";
import { GithubIcon, Goggle } from "@/components/Icons";

const socialPlatforms: Record<PlatformNameTypes, SocialPlatformTypes> = {
  Google: {
    className: "bg-white text-black border border-gray-300 hover:bg-gray-100",
    icon: <Goggle />,
  },
  GitHub: {
    className: "bg-gray-800 text-white hover:bg-gray-700",
    icon: <GithubIcon />,
  },
};

const SocialButton: React.FC<SocialButtonTypes> = ({ platform }) => {
  const { className, icon } = socialPlatforms[platform];
  return (
    <button
      className={`text-base font-semibold truncate flex items-center justify-center w-full px-4 py-2 mb-3 rounded-md transition-colors ${className}`}
    >
      {icon}
      <span className="truncate">Continue with {platform}</span>
    </button>
  );
};

export default SocialButton;
