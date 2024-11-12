import Button from "@/components/common/Button";
import React from "react";

export default async function page({ params }: any) { 
  return (
    <form>
    <div className="flex flex-row justify-between items-center mb-6">
      <div className="">
        <h1 className="text-2xl font-semibold">Add New Product</h1>
        {/* <Breadcrumb /> */}
      </div>
      <div className="flex space-x-2">
        <Button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Save
        </Button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-6">
        <>All variants</>
      </div>
      <div className="md:col-span-2 space-y-6">
        <>single Variant</>
      </div>

    </div>
  </form>
  );
}
