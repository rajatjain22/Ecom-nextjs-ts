import React, { useEffect } from "react";
import Image from "next/image";
import { FileUploadProps } from "./type";
import { UploadIcon } from "@/components/Icons";

const FileUpload: React.FC<FileUploadProps> = ({ id, label, name, onChange, multiple=false, files=[], accept, ...rest }) => {
  const acceptData = accept ? accept.map(e=>`image/${e.toLowerCase()}`).join(",") : "image/*";

  useEffect(() => {
    // Clean up object URLs when files are no longer needed
    files.forEach((file) => {
      const objectURL = URL.createObjectURL(file);
      return () => URL.revokeObjectURL(objectURL);
    });
  }, [files]);

  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 inline-block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {files.length === 0 ? (
        <div className="rounded-lg border-2 border-gray-200 border-dashed">
          <label
            htmlFor={id}
            className="p-4 min-h-[180px] flex flex-col items-center justify-center text-center cursor-pointer"
          >
            <UploadIcon />
            <h4 className="text-sm text-gray-600">
              {/* Drag & Drop or{" "} */}
              <span className="text-blue-600 cursor-pointer">Choose file</span> to upload
            </h4>
          </label>
        </div>
      ) : (
        <div className="flex flex-wrap gap-5 mt-2">
          {files.map((file, index) => (
            <div key={index} className="relative w-24 h-24">
              <Image
                src={URL.createObjectURL(file)} // Creating Object URL for the file
                alt={file.name}
                className="rounded-lg"
                fill
              />
            </div>
          ))}
          <label htmlFor={id} className="text-gray-400 cursor-pointer">
            <div className="w-20 h-20 border-2 border-dashed border-gray-300 flex items-center justify-center rounded">
              +
            </div>
          </label>
        </div>
      )}
      <input
        type="file"
        id={id}
        name={name}
        className="hidden"
        onChange={onChange}
        accept={acceptData}
        multiple={multiple}
        {...rest}
      />
    </div>
  );
};

export default FileUpload;
