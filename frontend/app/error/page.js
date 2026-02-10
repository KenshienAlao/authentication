"use client";

import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();

  const login = () => {
    router.push("/login");
  };

  return (
    <div className="flex justify-center flex-col items-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">
        <span className="text-red-500">404</span> - Page Not Found
      </h1>
      <p className="mb-4 text-gray-500">
        Sorry, the page you are looking for does not exist.
      </p>
      <button
        onClick={login}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go to Login
      </button>
    </div>
  );
}
