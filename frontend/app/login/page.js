"use client";

import axios from "axios";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          email,
          password,
        },
      );
      console.log(res.data);
      alert(res.data.message);
      localStorage.setItem("token", res.data.token);
      router.push("/main/dashboard");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center border border-gray-300 rounded px-4 py-2 mb-4 shadow-2xl">
        <h1 className="text-2xl font-bold my-6">Login</h1>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center justify-center mb-4"
        >
          {/* email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              required
              className="border border-gray-300 rounded px-4 py-2 mb-4"
            />
          </div>
          {/* password */}
          <div className="flex relative flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="border border-gray-300 rounded px-4 py-2 mb-4"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-10"
            >
              {showPassword ? <Eye /> : <EyeClosed />}
            </button>
          </div>
          {/* forgot password */}
          <div className="flex justify-end w-full mb-5">
            <button className="text-blue-600 text-sm hover:underline">
              Forgot Password?
            </button>
          </div>
          {/* login button */}
          <button
            type="submit"
            className="bg-blue-600 w-full text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        {/* sign up */}
        <footer>
          <div
            onClick={() => router.push("/signup")}
            className="flex justify-center w-full mt-5"
          >
            <p className="text-sm">
              Don't have an account?{" "}
              <span className="text-blue-600 hover:underline">Sign Up</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
