"use client";

import axios from "axios";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
        {
          username,
          email,
          password,
        },
      );
      console.log(res.data);
      alert(res.data.message);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center border border-gray-300 rounded px-4 py-2 mb-4 shadow-2xl">
        <h1 className="text-2xl font-bold my-6">Signup</h1>
        <form
          onSubmit={handleSignup}
          className="flex flex-col items-center justify-center mb-4"
        >
          {/* username */}
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              required
              className="border border-gray-300 rounded px-4 py-2 mb-4"
            />
          </div>
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
              type="text"
              placeholder="Password"
              required
              className="border border-gray-300 rounded px-4 py-2 mb-4"
            />
          </div>
          {/* confirmation */}
          <div className="flex relative flex-col gap-2">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="text"
              placeholder="Confirm Password"
              required
              className="border border-gray-300 rounded px-4 py-2 mb-4"
            />
          </div>
          {/* Signup button */}
          <button
            type="submit"
            className="bg-blue-600 w-full text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Signup
          </button>
        </form>
        {/* login */}
        <footer>
          <div
            onClick={() => router.push("/login")}
            className="flex justify-center w-full mt-5"
          >
            <p className="text-sm">
              Already have an account?{" "}
              <span className="text-blue-600 hover:underline">Login</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
