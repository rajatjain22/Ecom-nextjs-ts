import { notFound } from "next/navigation";
import CustomerForm from "./Form";
import { createCustomer, getCustomerById, updateCustomer } from "@/services/customer.service";

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
      profile: true,
      dateOfBirth: true,
      gender: true,
      notes: true,
      tags: true,
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
      shippingAddresses: {
        select: {
          id: true,
          shippingAddressLine1: true,
          shippingAddressLine2: true,
          postalCode: true,
          city: true,
          district: true,
          state: true,
          country: true,
          isPrimary: true,
        },
      },
      _count: true,
    },
  });

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

  return <CustomerForm customer={customer} createCustomer={createCustomer} updateCustomer={updateCustomer} />;
}
