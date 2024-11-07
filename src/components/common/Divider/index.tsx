import { FC } from "react";

interface deviderProps {
  text?: string;
}

const Divider: FC<deviderProps> = ({ text }) => {
  return (
    <div className="relative mb-6 flex h-px place-items-center bg-gray-200">
      <div className="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-600">
        {text}
      </div>
    </div>
  );
};

export default Divider;