import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export const userCreateValidationSchema = Yup.object({
  name: Yup.string()
    .required("Full Name is required")
    .min(2, "Name must be at least 2 characters"),
  username: Yup.string()
    .required("Username is required")
    .min(2, "Username must be at least 2 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  role: Yup.string().required("Role is required"),
});

export const userUpdateValidationSchema = Yup.object({
  name: Yup.string()
    .required("Full Name is required")
    .min(2, "Name must be at least 2 characters"),
  username: Yup.string()
    .required("Username is required")
    .min(2, "Username must be at least 2 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  role: Yup.string().required("Role is required"),
});
