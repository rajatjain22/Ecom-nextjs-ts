"use client";

import Breadcrumb from "@/components/common/Breadcrumb";
import Card from "@/components/common/Card";
import Image from "next/image";
import React from "react";

// Define types for the order and item
interface ProductImage {
  url: string;
  alt?: string;
}

interface ProductVariant {
  title: string;
}

interface Product {
  title: string;
  variant: ProductVariant;
  images?: ProductImage[];
}

interface OrderItem {
  product: Product;
  quantity: number;
  price: string;
}

interface Payment {
  paymentMethod: string;
  amount: number;
}

interface User {
  firstName: string;
  lastName?: string;
  mobile?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: string;
  shippingAddress: string;
  billingAddress: string;
  user: User;
  payments: Payment[];
}

interface SaveOrderProps {
  order: Order;
}

const SaveOrder: React.FC<SaveOrderProps> = ({ order }) => {
  const {
    orderNumber,
    items,
    totalAmount,
    shippingAddress,
    billingAddress,
    user,
    payments,
  } = order;

  return (
    <form className="space-y-6">
      <div className="flex flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Orders {orderNumber}</h1>
          <Breadcrumb />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="space-y-2">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h2 className="text-md md:text-lg font-semibold">All item</h2>
            </div>
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 border-b"
              >
                <Image
                  src={
                    item.product.images?.[0].url ??
                    "https://cdn.shopify.com/s/files/1/0599/0580/2372/files/screenshot-dribbble_com-2024_10_27-15_56_54_40x40@3x.png?v=1730027152"
                  }
                  alt={item.product.images?.[0].alt ?? "Product image"}
                  className="w-10 h-10 border rounded-lg"
                  width={30}
                  height={30}
                />
                <div className="flex-1 ml-4">
                  <p className="font-semibold text-sm md:text-base">
                    {item.product.title}
                  </p>
                  <p className="text-sm md:text-base text-gray-500">
                    {item.product.variant.title}
                  </p>
                </div>
                <div className="flex flex-row gap-8 text-center">
                  <p className="font-semibold text-sm md:text-base">
                    {item.quantity}
                  </p>
                  <p className="font-semibold text-sm md:text-base">
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </Card>
          <Card>
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
                  {totalAmount}
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
              <p className="text-xs md:text-sm text-gray-500">
                {user.firstName} {user?.lastName}
              </p>
              <p className="text-xs md:text-sm text-gray-500">{user.mobile}</p>
            </div>
            <div>
              <h3 className="text-sm md:text-md font-medium mb-2">
                Shipping Address
              </h3>
              <p className="text-xs md:text-sm text-gray-500">
                {shippingAddress}
              </p>
            </div>
            <div>
              <h3 className="text-sm md:text-md font-medium mb-2">
                Billing address
              </h3>
              <p className="text-xs md:text-sm text-gray-500">
                {billingAddress}
              </p>
            </div>
          </Card>
          <Card>
            <h2 className="text-md md:text-lg font-semibold mb-2">
              Payment Method
            </h2>
            {payments.map((payment, index) => (
              <p
                key={index}
                className="text-xs md:text-sm text-gray-500 uppercase"
              >
                {payment.paymentMethod} - ${payment?.amount.toFixed(2)}
              </p>
            ))}
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
};

export default SaveOrder;
