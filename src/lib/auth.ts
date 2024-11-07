import bcrypt from "bcryptjs";

// Hash Password
export const hashPassword = async (password: string, saltRounds: number = 10): Promise<string> => {
  if (typeof password !== "string") {
    throw new Error("Password must be a string");
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Compare Hash Password
export const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
};
