import type { Metadata } from "next";
import LoginForm from "./Form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login",
};

export default async function page() {
  return <LoginForm />;
}

