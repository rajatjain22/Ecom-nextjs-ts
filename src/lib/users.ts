import prisma from "@/config/db.server";

// Check for existing user by email
export const getUserByEmail = async (email: string | undefined, options = {}) => {
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
