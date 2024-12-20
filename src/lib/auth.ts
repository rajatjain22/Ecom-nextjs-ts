import bcrypt from "bcryptjs";

export const generateRandomPassword = (length = 8) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
};

// Hash Password
export const hashPassword = async (
  password: string,
  saltRounds: number = 10
): Promise<string> => {
  if (typeof password !== "string") {
    throw new Error("Password must be a string");
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Compare Hash Password
export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
};

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
