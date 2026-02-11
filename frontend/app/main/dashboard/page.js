"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [emailShow, setEmailShow] = useState(false);
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  // required states
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // checking token
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/error");
    }

    const fetch = async () => {
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
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

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

            <div className="mb-6">
              {/* email */}
              <p className="text-lg">
                email:{" "}
                <span className="font-bold">
                  {emailShow ? userData?.email : "********"}
                </span>
              </p>
              {/* username */}
              <p className="text-lg">
                username:{" "}
                <span className="font-bold">{userData?.username}</span>
              </p>
              {/* id */}
              <p className="text-lg mb-2">
                id: <span className="font-bold">{userData?.id}</span>
              </p>
              <button
                onClick={() => setEmailShow(!emailShow)}
                className="bg-blue-600 p-2 rounded-lg text-white text-center w-full"
              >
                {" "}
                {emailShow ? "hide email" : "show email"} 
              </button>
            </div>
          </div>
          {/* logout button */}
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
