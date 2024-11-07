import * as Yup from "yup";

interface LoginValues {
  email: string;
  password: string;
}

interface SignupValues {
  name: string;
  email: string;
  password: string;
}

export const LOGIN_INITIAL_VALUES: LoginValues = {
  email: "",
  password: ""
};

export const SIGNUP_INITIAL_VALUES: SignupValues = {
  name: '',
  email: '',
  password: '',
};

export const LOGIN_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email.")
    .required("Email is required."),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long.")
    .required("Password is required.")
});

// Validation schema for the signup form
export const SIGNUP_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
});