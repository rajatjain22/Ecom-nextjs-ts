import prisma from "@/config/db.server";

export const getOrderById = async (
  orderId: string,
  options?: any
): Promise<any> => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      ...options,
    });

    if (!order) {
      throw new Error("Order not found");
    }

    return { ...order };
  } catch (error) {
    console.error("Error fetching order by id:", error);
    return null;
    // throw new orderror(
    //   "Failed to retrieve order data",
    //   STATUS.BAD_REQUEST
    // );
  }
};

export const getAllOrders = async ({
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

    const [orders, totalCount] = await Promise.all([
      prisma.order.findMany({
        skip,
        take,
        ...options,
      }),
      prisma.users.count(),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      orders,
      totalCount,
      totalPages,
      page,
    };
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return null;
    // throw new CustomError(
    //   "Failed to retrieve orders data",
    //   STATUS.BAD_REQUEST
    // );
  }
};
