import { CustomerFormValuesType } from "@/components/layout/Customer/types";
import prisma from "@/config/db.server";
import { MESSAGES } from "@/constants/apiMessages";
import { generateRandomPassword, hashPassword } from "@/lib/auth";

// Check for existing user by email
export const getUserByEmail = async (
  email: string | undefined,
  options = {}
) => {
  if (!email) {
    throw new Error("Email is required");
  }

  try {
    return await prisma.users.findUnique({
      where: { email },
      ...options,
    });
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Failed to retrieve user data");
  }
};

export const createCustomer = async ({
  firstName,
  lastName,
  email,
  mobile,
  gender,
  dateOfBirth,
  profile,
  notes,
  tags,
  shippingAddressLine1,
  shippingAddressLine2,
  city,
  district,
  state,
  postalCode,
  country,
}: CustomerFormValuesType): Promise<any> => {
  "use server";
  console.log(profile);
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error(MESSAGES.USER.EMAIL_ALREADY_EXISTS);
  }
  const password = generateRandomPassword(15);

  const hashedPassword = await hashPassword(password as string, 10);

  const user = await prisma.users.create({
    data: {
      firstName,
      lastName,
      email,
      mobile: String(mobile),
      gender,
      dateOfBirth,
      profile,
      password: hashedPassword,
      notes,
      tags,
    },
  });

  await prisma.shippingAddress.create({
    data: {
      userId: user.id,
      shippingAddressLine1,
      shippingAddressLine2,
      city,
      district,
      state,
      postalCode,
      country,
    },
  });

  return true;
};

export const updateCustomer = async ({
  id,
  firstName,
  lastName,
  email,
  mobile,
  gender,
  dateOfBirth,
  profile,
  notes,
  tags,
  shippingAddressId,
  shippingAddressLine1,
  shippingAddressLine2,
  city,
  district,
  state,
  postalCode,
  country,
  shippingAddress,
}: CustomerFormValuesType): Promise<any> => {
  "use server";
  const existingUser = await prisma.users.findUnique({
    where: { id },
  });
  
  if (!existingUser) {
    throw new Error(MESSAGES.USER.NOT_FOUND);
  }

  if (existingUser.email !== email) {
    const userWithEmail = await prisma.users.findUnique({
      where: { email },
    });
    if (userWithEmail) {
      throw new Error(MESSAGES.USER.EMAIL_ALREADY_EXISTS);
    }
  }

  await prisma.users.update({
    where: { id },
    data: {
      firstName,
      lastName,
      email,
      mobile: String(mobile),
      gender,
      dateOfBirth,
      profile: profile || existingUser.profile,
      notes,
      tags,
    },
  });

  await prisma.shippingAddress.update({
    where: { id: shippingAddressId },
    data: {
      shippingAddressLine1,
      shippingAddressLine2,
      city,
      district,
      state,
      postalCode,
      country,
    },
  });

  return true;
};

export const getAllCustomers = async ({
  page = 1,
  limit = 10,
  ...options
}: {
  page?: number;
  limit?: number;
  [key: string]: any;
} = {}): Promise<any> => {
  "use server";
  try {
    const skip = (page - 1) * limit;
    const take = limit;

    const [customers, totalCount] = await Promise.all([
      prisma.users.findMany({
        skip,
        take,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          mobile: true,
          gender: true,
          dateOfBirth: true,
          role: true,
          profile: true,
          isActive: true,
          notes: true,
          tags: true,
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
        },
      }),
      prisma.users.count(),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    const newCustomer = customers.map((customer: any) => {
      return {
        ...customer,
        country: customer.shippingAddresses[0].country,
        district: customer.shippingAddresses[0].district  ,
        state: customer.shippingAddresses[0].state,
      };
    });

    return {
      customers: newCustomer,
      totalCount,
      totalPages,
      page,
    };
  } catch (error) {
    console.error("Error fetching all customers:", error);
    return { customers: [], totalCount: 0, totalPages: 0, page: 0 };
  }
};

export const getCustomerById = async (
  custoemrId: string,
  options?: any
): Promise<any> => {
  try {
    const customer = await prisma.users.findUnique({
      where: { id: custoemrId },
      ...options,
    });

    if (!customer) {
      throw new Error("Customer not found");
    }

    return customer;
  } catch (error) {
    console.error("Error fetching customer by id:", error);
    return null;
  }
};
