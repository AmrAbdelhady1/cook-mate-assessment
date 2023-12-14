"use client";

import Link from "next/link";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

const LoginSchema = Yup.object().shape({
  name: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("E-mail is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().required("Confirm Password is required"),
});

const Register = () => {
  interface InputData {
    label: string;
    type: string;
    name: keyof typeof formik.values;
    placeholder: string;
  }
  const inputData: InputData[] = [
    {
      label: "Username",
      type: "text",
      name: "name",
      placeholder: "Type your username",
    },
    {
      label: "Email Address",
      type: "text",
      name: "email",
      placeholder: "Type your email address",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "*****************",
    },
    {
      label: "Confirm password",
      type: "password",
      name: "confirmPassword",
      placeholder: "*****************",
    },
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: LoginSchema,
    onSubmit: () => handleSubmit(),
  });

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          email: formik.values.email,
          password: formik.values.password,
          username: formik.values.name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        signIn();
      } else {
        toast.error("email is already taken");
      }
    } catch (error: any) {
      // setError(error?.message)
    }
  };
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex w-full justify-between gap-[110px] text-dark"
    >
      <Toaster position="top-right" />
      <div className="w-full">
        <h1 className="auth-header">Join the CookMate Community!</h1>
        <p className="auth-text">Create your account</p>

        <div className="mt-[84px]">
          {inputData.map((item: InputData, index: any) => (
            <div key={index}>
              <p className="auth-label">{item.label}</p>
              {formik.touched[item.name] && formik.errors[item.name] && (
                <p className="auth-error">{formik.errors[item.name]}</p>
              )}
              <input
                type={item.type}
                className="auth-input"
                placeholder={item.placeholder}
                name={item.name}
                value={formik.values[item.name]}
                onChange={formik.handleChange}
              />
            </div>
          ))}

          <p className="text-black">
            By signing up, you agree to our Terms and Conditions.
          </p>

          <button type="submit" className="auth-button">
            Create new
            <Image
              alt="arrow"
              src="/assets/icons/arrow-right.svg"
              width={22}
              height={22}
            />
          </button>

          <Link href={"/login"} className="auth-link font-bold">
            Already have an account?
          </Link>
        </div>
      </div>

      <Image
        src="/assets/images/register-chars.svg"
        alt="chars"
        width={789}
        height={618.115}
        className="w-full"
        priority
      />
    </form>
  );
};

export default Register;
