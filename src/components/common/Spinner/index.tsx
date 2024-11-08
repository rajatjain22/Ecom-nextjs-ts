import { SpinnerIcon } from "@/components/Icons";
import React from "react";

interface SpinnerProps {
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ className = "" }) => {
  return (
    <div role="status" className="flex items-center justify-center">
      <SpinnerIcon className={className}/>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
