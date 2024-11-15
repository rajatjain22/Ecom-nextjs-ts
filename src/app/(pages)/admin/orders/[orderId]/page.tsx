"use client";

import Breadcrumb from "@/components/common/Breadcrumb";
import Card from "@/components/common/Card";
import Image from "next/image";
import React from "react";

function page() {
  return (
    <form className="space-y-6">
      <div className="flex flex-row justify-between items-center mb-6">
        <div className="">
          <h1 className="text-2xl font-semibold">Orders #12345</h1>
          <Breadcrumb />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="space-y-2">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h2 className="text-md md:text-lg font-semibold">All item</h2>
            </div>
            <div className="flex items-center justify-between p-2 border-b">
              <Image
                src="https://placehold.co/60x60"
                alt="Product image"
                className="w-10 h-10 border rounded-lg"
                width={30}
                height={30}
              />
              <div className="flex-1 ml-4">
                <p className="font-semibold text-sm md:text-base">
                  Kristin Watson
                </p>
                <p className="text-sm md:text-base text-gray-500">Variant</p>
              </div>
              <div className="flex flex-row gap-8 text-center">
                <p className="font-semibold text-sm md:text-base">1</p>
                <p className="font-semibold text-sm md:text-base">$50.47</p>
              </div>
            </div>
          </Card>
          <Card className="">
            <h2 className="text-md md:text-lg font-semibold mb-4">
              Cart Totals
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-xs md:text-sm text-gray-500">Subtotal:</p>
                <p className="font-semibold text-sm md:text-base">$70.13</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs md:text-sm text-gray-500">Shipping:</p>
                <p className="font-semibold text-sm md:text-base">$10.00</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs md:text-sm text-gray-500">Tax (GST):</p>
                <p className="font-semibold text-sm md:text-base">$5.00</p>
              </div>
              <div className="flex justify-between border-t py-1">
                <p className="text-xs md:text-sm text-gray-500 font-semibold">
                  Total price:
                </p>
                <p className="font-semibold text-sm md:text-base text-red-500">
                  $90.58
                </p>
              </div>
            </div>
          </Card>
        </div>
        <div className="space-y-4 md:space-y-6">
          <Card className="space-y-4">
            <h2 className="text-md md:text-lg font-semibold">Customer</h2>
            <div>
              <h3 className="text-sm md:text-md font-medium mb-2">
                Contact information
              </h3>
              <p className="text-xs md:text-sm text-gray-500">Rajat Jain</p>
              <p className="text-xs md:text-sm text-gray-500">9826639872</p>
            </div>
            <div>
              <h3 className="text-sm md:text-md font-medium mb-2">
                Shipping Address
              </h3>
              <p className="text-xs md:text-sm text-gray-500">
                3517 W. Gray St. Utica, Pennsylvania
              </p>
              <p className="text-xs md:text-sm text-gray-500">57867</p>
            </div>
            <div>
              <h3 className="text-sm md:text-md font-medium mb-2">
                Billing address
              </h3>
              <p className="text-xs md:text-sm text-gray-500">
                3517 W. Gray St. Utica, Pennsylvania 57867
              </p>
            </div>
          </Card>
          <Card>
            <h2 className="text-md md:text-lg font-semibold mb-2">
              Payment Method
            </h2>
            <p className="text-xs md:text-sm text-gray-500">
              Pay on Delivery (Cash/Card). Cash on delivery (COD) available.
              Card/Net banking acceptance subject to device availability.
            </p>
          </Card>
          <Card>
            <h2 className="text-md md:text-lg font-semibold mb-2">
              Expected Date Of Delivery
            </h2>
            <div className="flex items-center justify-between">
              <p className="font-semibold text-sm md:text-base text-green-500">
                20 Nov 2023
              </p>
              <button className="bg-blue-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg flex items-center">
                <i className="fas fa-truck mr-1 md:mr-2"></i> Track order
              </button>
            </div>
          </Card>
        </div>
      </div>
    </form>
  );
}

export default page;
