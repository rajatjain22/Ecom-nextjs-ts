import { notFound } from "next/navigation";
import CustomerForm from "./Form";
import { getCustomerById } from "@/lib/customer";

async function fetchCustomerData(customerId: string | undefined) {
  if (!customerId || customerId === "new") return;
  const customer = await getCustomerById(customerId, {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      mobile: true,
      role: true,
      district: true,
      state: true,
      isActive: true,
      images: {
        select: {
          id: true,
          url: true,
          alt: true,
          name: true,
          size: true,
          mimeType: true,
          isPrimary: true,
        },
      },
    },
  });

  if (!customer) {
    console.error("Customer not found");
    return null;
  }

  return customer;
}

export default async function Page({
  params,
}: {
  params: { customerId?: string };
}) {
  const { customerId } = params;

  const customer = await fetchCustomerData(customerId);
  if (customerId !== "new" && !customer) return notFound();

  return <CustomerForm customer={customer} />;
}
