"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  // required states
  const [loading, setLoading] = useState(true);

  // checking token
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/error");
  }

  // data fetching
  const handleUserInfo = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/dashboard`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      console.log(res.data);
      setUserData(res.data.data);
    } catch (error) {
      console.log(error);
      router.push("/error");
    } finally {
      setLoading(false);
    }
  };

  // logout and remove token
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <>
      {/* loading */}
      {loading ? null : (
        // dashboard
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="flex mb-5 flex-col items-center justify-center border border-gray-300 rounded p-8 shadow-2xl">
            <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
            {userData ? (
              <div className="mb-6">
                <p className="text-lg">
                  email: <span className="font-bold">{userData.email}</span>
                </p>
                <p className="text-lg">
                  username:{" "}
                  <span className="font-bold">{userData.username}</span>
                </p>
                <p className="text-lg">
                  id: <span className="font-bold">{userData.id}</span>
                </p>
              </div>
            ) : (
              <p className="mb-6 text-gray-500">No user data loaded</p>
            )}
            <button
              onClick={handleUserInfo}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition w-full"
            >
              Get User Info
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="h-10 w-40 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}
