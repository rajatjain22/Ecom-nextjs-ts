import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import SignupForm from "./Form";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Signup",
  description: "Signup",
};

const SignupPage = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/dashboard");
  }

  return <SignupForm />;
};

export default SignupPage;
