import React from "react";

interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  name: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ id, label, name, ...rest }) => {
  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 inline-block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="rounded-lg border-2 border-gray-200 border-dashed">
        <label htmlFor={id} className="p-4 min-h-[180px] flex flex-col items-center justify-center text-center cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 mb-4 fill-gray-600 inline-block" viewBox="0 0 32 32">
            <path
              d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
            />
            <path
              d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
            />
          </svg>

          <h4 className="text-sm text-gray-600">
            Drag & Drop or{" "}
            <span className="text-blue-600 cursor-pointer">Choose file</span> to upload
          </h4>
        </label>
        <input type="file" id={id} name={name} className="hidden" {...rest} />
      </div>
    </>
  );
};

export default FileUpload;
