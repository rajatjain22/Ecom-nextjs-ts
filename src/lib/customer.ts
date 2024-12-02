import prisma from "@/config/db.server";

export const getCustomerById = async (
  custoemrId: string,
  options?: any
): Promise<any> => {
  try {
    const customer = await prisma.users.findUnique({
      where: { id: custoemrId },
      ...options,
    });

    console.log(customer);

    if (!customer) {
      throw new Error("Customer not found");
    }

    return { ...customer };
  } catch (error) {
    console.error("Error fetching customer by id:", error);
    return null;
    // throw new CustomError(
    //   "Failed to retrieve customer data",
    //   STATUS.BAD_REQUEST
    // );
  }
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
        ...options,
      }),
      prisma.users.count(),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      customers,
      totalCount,
      totalPages,
      page,
    };
  } catch (error) {
    console.error("Error fetching all customers:", error);
    return null;
    // throw new CustomError(
    //   "Failed to retrieve customers data",
    //   STATUS.BAD_REQUEST
    // );
  }
};
