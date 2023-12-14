"use client";

import Link from "next/link";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("E-mail is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const router = useRouter();
  interface InputData {
    label: string;
    type: string;
    name: keyof typeof formik.values;
    placeholder: string;
  }
  const inputData: InputData[] = [
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
  ];
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: () => handleSubmit(),
  });

  const handleSubmit = async () => {
    try {
      const res = await signIn("credentials", {
        ...formik.values,
        redirect: false,
      });
      if (!res?.error) {
        router.push("/");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (err: any) {}
  };
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex items-center w-full justify-between gap-[110px] text-dark mb-10"
    >
      <Toaster position="top-right" />
      <div className="w-full">
        <h1 className="auth-header">Welcome to CookMate!</h1>
        <p className="auth-text">Sign in to your account</p>

        <div className="mt-[96px]">
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

          <Link href={"/forget-password"} className="auth-link text-black">
            Forgot your password?
          </Link>

          <button type="submit" className="auth-button">
            Sign in now
            <Image
              alt="arrow"
              src="/assets/icons/arrow-right.svg"
              width={22}
              height={22}
            />
          </button>

          <Link href={"/register"} className="auth-link font-bold">
            New to CookMate?
          </Link>
        </div>
      </div>

      <Image
        src="/assets/images/login-chars.svg"
        alt="chars"
        width={789}
        height={618.115}
        className="w-full"
        priority
      />
    </form>
  );
};

export default Login;
