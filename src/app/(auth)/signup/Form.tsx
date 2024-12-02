"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// Components
import Button from "@/components/common/Button";
import Input from "@/components/common/Input/Input";
import Divider from "@/components/common/Divider";
import SocialButton from "@/components/common/Button/SocialButton";
import Card from "@/components/common/Card";

// Utilities
import { SIGNUP_INITIAL_VALUES, SIGNUP_SCHEMA } from "@/utilities/yupValidations/auth";

// Define types for the form values
interface SignupValues {
  firstName: string;
  email: string;
  password: string;
}

const SignupForm: React.FC = () => {
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (values: SignupValues) => {
      const response = await axios.post("/api/signup", values);
      return response.data;
    },
    onError: (error: unknown) => {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "An unexpected error occurred. Please try again.";
      setError(errorMessage);
    },
    onSuccess: () => {
      router.push("/login");
    },
  });

  const formik = useFormik<SignupValues>({
    initialValues: SIGNUP_INITIAL_VALUES,
    validationSchema: SIGNUP_SCHEMA,
    onSubmit: (values) => {
      setError("");
      mutation.mutate(values);
    },
  });

  return (
    <div className="h-screen flex justify-center items-center py-10">
      <Card className="m-2 w-[30rem] animate-fadeIn">
        <div className="flex-auto space-y-4">
          <h1 className="mb-6 flex items-center justify-center text-3xl font-bold uppercase tracking-tight text-blue-600">
            SIGNUP
          </h1>

          <form onSubmit={formik.handleSubmit} className="space-y-2">
            {["firstName", "email"].map((field) => (
              <Input
                key={field}
                id={field}
                name={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                type="text"
                placeholder={`Enter your ${field}`}
                value={formik.values[field as keyof SignupValues]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched[field as keyof SignupValues] ? formik.errors[field as keyof SignupValues] : undefined}
                autoFocus={field === "firstName"}
              />
            ))}

            <Input
              id="password"
              name="password"
              label="Password"
              type="password"
              placeholder="············"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password ? formik.errors.password : undefined}
              autoFocus
            />
            {error && <div className="text-red-600 mb-4">{error}</div>}

            <Button
              type="submit"
              className="w-full !mt-4 rounded-lg bg-blue-600 py-2 text-sm text-white transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              variant="primary"
              loading={mutation.isPending}
            >
              Sign Up
            </Button>

            <p className="mb-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:text-blue-700">
                Login
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

export default SignupForm;
