import React from "react";
import Image from "next/image";
import { ProfileUploadProps } from "./type";
import { UploadIcon } from "@/components/Icons";

const ProfileUpload: React.FC<ProfileUploadProps> = ({
  id,
  label,
  name,
  onChange,
  files = null,
  accept,
  ...rest
}) => {
  const acceptData = accept
    ? accept.map((e) => `image/${e.toLowerCase()}`).join(",")
    : "image/*";

  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 inline-block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {!files ? (
        <div className="rounded-lg border-2 border-gray-200 border-dashed">
          <label
            htmlFor={id}
            className="p-4 min-h-[180px] flex flex-col items-center justify-center text-center cursor-pointer"
          >
            <UploadIcon />
            <h4 className="text-sm text-gray-600">
              {/* Drag & Drop or{" "} */}
              <span className="text-blue-600 cursor-pointer">
                Choose file
              </span>{" "}
              to upload
            </h4>
          </label>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-5 mt-2">
          <div className="relative w-48 h-48 ">
            <Image
              src={files?.url || URL.createObjectURL(files)}
              alt={files.name}
              className="rounded-full"
              fill
            />
          </div>
        </div>
      )}
      <input
        type="file"
        id={id}
        name={name}
        className="hidden"
        onChange={onChange}
        accept={acceptData}
        multiple={false}
        {...rest}
      />
    </div>
  );
};

export default ProfileUpload;
