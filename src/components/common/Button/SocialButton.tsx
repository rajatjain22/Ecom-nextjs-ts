import React from "react";
import { PlatformNameTypes, SocialButtonTypes, SocialPlatformTypes } from "./button";

const socialPlatforms: Record<PlatformNameTypes, SocialPlatformTypes> = {
  Google: {
    className: "bg-white text-black border border-gray-300 hover:bg-gray-100",
    icon: (
      <svg
        className="w-5 h-5 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          fill="#EA4335"
          d="M24 9.5c3.16 0 5.85 1.09 8.04 2.9l6.04-6.04C34.74 3.02 29.68 1 24 1 14.86 1 7.2 6.82 4.22 14.78l7.26 5.63C13.63 13.28 18.38 9.5 24 9.5z"
        />
        <path
          fill="#4285F4"
          d="M48 24.5c0-1.61-.14-3.16-.39-4.67H24v9.34h13.61c-.6 3.23-2.44 5.95-5.14 7.77l7.88 6.12C44.84 39.63 48 32.53 48 24.5z"
        />
        <path
          fill="#FBBC05"
          d="M7.48 28.41c-.78-2.34-1.22-4.83-1.22-7.41s.44-5.06 1.22-7.41L1.44 7.96C.52 10.15 0 12.54 0 15c0 2.46.52 4.85 1.44 7.04l6.04-4.63z"
        />
        <path
          fill="#34A853"
          d="M24 47c6.48 0 11.91-2.16 15.88-5.84l-7.88-6.12c-2.21 1.46-5.04 2.34-8 2.34-5.62 0-10.37-3.78-12.14-8.87L4.22 33.3C7.2 41.18 14.86 47 24 47z"
        />
      </svg>
    ),
  },
  GitHub: {
    className: "bg-gray-800 text-white hover:bg-gray-700",
    icon: (
      <svg
        className="w-5 h-5 mr-2"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.477 2 12a10 10 0 006.839 9.479c.5.092.682-.217.682-.483 0-.237-.009-.866-.014-1.7-2.782.605-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.463-1.11-1.463-.907-.62.068-.607.068-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.647.349-1.086.635-1.336-2.22-.252-4.555-1.11-4.555-4.943 0-1.091.39-1.985 1.029-2.684-.103-.253-.447-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.563 9.563 0 0112 6.845c.851.004 1.707.115 2.507.338 1.91-1.295 2.749-1.026 2.749-1.026.546 1.376.202 2.394.1 2.647.641.699 1.028 1.593 1.028 2.684 0 3.842-2.337 4.688-4.565 4.935.36.31.679.924.679 1.861 0 1.344-.012 2.428-.012 2.758 0 .267.18.579.687.481A10.005 10.005 0 0022 12c0-5.523-4.477-10-10-10z"
        />
      </svg>
    ),
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
