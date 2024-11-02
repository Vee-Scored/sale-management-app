import React from "react";
import { useForm } from "react-hook-form";
import Container from "./Container";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const nav = useNavigate();
  const successNotify = () => toast.success("Successfully Logged in");
  const unauthen = () => {
    Swal.fire({
      icon: "error",
      title: "Login Failed!",
      text: "Unauthenticated Account, Sign Up again!",
    });
    localStorage.removeItem("token")
    nav("/")
  };

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/login", {
        email: data.email,
        password: data.password,
      });

      if (res.status >= 200 && res.status < 300) {
        localStorage.setItem("token", res.data.token);
        console.log(res);
        nav("/dashboard");
        successNotify();
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login failed. Please check your credentials and try again.");
      unauthen();
    }
    // Handle login logic here
  };

  return (
    <Container>
      <div className="flex justify-center items-center px-3 min-h-screen">
        <div className="max-w-md w-full  space-y-8 p-10  bg-white rounded-2xl shadow-2xl transform transition duration-500 hover:scale-105">
          <div className="text-center">
            <h2 className="mt-6 text-4xl font-bold text-gray-900">Login</h2>
            <p className="mt-2 text-sm font-semibold text-gray-600">
              MMS POS System
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="relative">
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email address",
                    },
                  })}
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-500">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-500">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-blue-500 group-hover:text-blue-400 transition ease-in-out duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Sign in
              </button>
            </div>
          </form>

          {/* Error messages */}
          <div className="mt-4 space-y-2">
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email.message}
              </p>
            )}
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Sign up link */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to={"/"}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LoginForm;
