"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // check if token is present
    const token = localStorage.getItem("token");
    // if token is present, redirect to dashboard
    if (token) {
      router.push("/dashboard");
    } else {
      // if token is not present, redirect to login
      router.push("/login");
    }
  }, [router]);

  return null;
}
