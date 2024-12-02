import { getOrderById } from "@/lib/order";
import OrderForm from "./Form";
import SaveOrder from "./SaveOrder";
import { notFound } from "next/navigation";

function convertDecimalToNumber(decimalValue: any): number | null {
  return decimalValue ? decimalValue.toNumber() : null;
}

// Function to fetch order data
async function fetchOrderData(orderId: string | undefined) {
  if (!orderId || orderId === "new") return;

  const order = await getOrderById(orderId, {
    include: {
      items: {
        include: {
          product: {
            select: {
              id: true,
              title: true,
              images: {
                select: {
                  url: true,
                  alt: true,
                  name: true,
                  size: true,
                  mimeType: true,
                },
              },
            },
          },
          productVariant: {
            select: {
              id: true,
              title: true,
              images: {
                select: {
                  url: true,
                  alt: true,
                  name: true,
                  size: true,
                  mimeType: true,
                },
              },
            },
          },
        },
      },
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          mobile: true,
        },
      },
      payments: true,
    },
  });

  if (!order) {
    console.error("Order not found");
    return null;
  }

  const items = order.items.map((e: any) => {
    const {
      id,
      orderId,
      productId,
      productVariantId,
      quantity,
      price,
      totalPrice,
      product,
      productVariant,
    } = e;

    return {
      id,
      orderId,
      productId,
      productVariantId,
      quantity,
      price: convertDecimalToNumber(price),
      totalPrice: convertDecimalToNumber(totalPrice),
      product: { ...product, variant: productVariant },
    };
  });

  return {
    ...order,
    totalAmount: convertDecimalToNumber(order.totalAmount),
    items,
    payments: order.payments.map((e: any) => ({
      ...e,
      amount: convertDecimalToNumber(e.amount),
    })),
  };
}

export default async function page({
  params,
}: {
  params: { orderId?: string };
}) {
  const { orderId } = params;

  const order = await fetchOrderData(orderId);
  if (orderId !== "new" && !order) return notFound();

  return orderId === "new" ? <OrderForm /> : <SaveOrder order={order} />;
}
