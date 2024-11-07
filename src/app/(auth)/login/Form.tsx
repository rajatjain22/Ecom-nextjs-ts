"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { getSession, signIn } from "next-auth/react";

// Components
import Button from "@/components/common/Button";
import Input from "@/components/common/Input/Input";
import Divider from "@/components/common/Divider";
import SocialButton from "@/components/common/Button/SocialButton";
import Card from "@/components/common/Card";

// Utilities
import { LOGIN_INITIAL_VALUES, LOGIN_SCHEMA } from "@/utilities/form";
import { SessionUser } from "@/interfaces/auth";

interface SignInError {
  message: string;
}

const LoginForm: React.FC = () => {
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (values: { email: string; password: string }) => {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      if (res?.error) throw new Error(res.error);
      return res;
    },
    onError: (error: SignInError) => {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred. Please try again.";
      setError(errorMessage);
    },
    onSuccess: async () => {
      const session = await getSession();
      const user = session?.user as SessionUser

      if (user?.role === 'admin') {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    },
  });

  const formik = useFormik({
    initialValues: LOGIN_INITIAL_VALUES,
    validationSchema: LOGIN_SCHEMA,
    onSubmit: (values) => {
      setError("");
      mutation.mutate(values);
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center text-gray-700">
      <Card className="sm:w-[30rem] animate-fadeIn">
        <div className="flex-auto">
          <h1 className="mb-6 flex items-center justify-center text-3xl font-bold uppercase tracking-tight text-blue-600">
            LOGIN
          </h1>
          
          <form onSubmit={formik.handleSubmit}>
            <Input
              label="Email"
              id="email"
              placeholder="Example@email.com"
              {...formik.getFieldProps("email")}
              error={formik.touched.email ? formik.errors.email : undefined}
              autoFocus
            />

            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              placeholder="············"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password ? formik.errors.password : undefined}
            />

            <Link href="#" className="mb-2 float-right text-sm text-blue-600 hover:text-blue-700">
              Forgot password?
            </Link>

            {error && (
              <div className="mb-2 text-red-600 inline-block text-xs font-medium">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-2 text-sm text-white transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              variant="primary"
              loading={mutation.isPending}
            >
              Sign In
            </Button>

            <p className="mb-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-blue-600 hover:text-blue-700">
                Signup
              </Link>
            </p>
          </form>
          <Divider text="or" />
          <SocialButton platform="Google" />
          <SocialButton platform="GitHub" />
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
