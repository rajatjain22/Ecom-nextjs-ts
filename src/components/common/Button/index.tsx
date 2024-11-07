// src/components/common/Button.tsx

import Image from "next/image";
import Spinner from "../Spinner";
import { ButtonTypes } from "./button";

const Button: React.FC<ButtonTypes> = ({
  type = "button",
//   size = "",
  children,
//   variant = "primary",
  className = "",
  icon,
  iconPosition = "left",
  iconSize = { width: 24, height: 24 },
  onClick,
  loading = false,
  disabled = false,
  ...rest
}) => {
  const disabledClass = disabled || loading ? "opacity-50 cursor-not-allowed" : "";
  const classes = `${disabledClass} ${className}`;

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <Spinner className="w-5 h-5" />
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <Image
              src={icon}
              alt="icon"
              width={iconSize.width}
              height={iconSize.height}
              className="mr-2"
            />
          )}
          {children}
          {icon && iconPosition === "right" && (
            <Image
              src={icon}
              alt="icon"
              width={iconSize.width}
              height={iconSize.height}
              className="ml-2"
            />
          )}
        </>
      )}
    </button>
  );
};

export default Button;
