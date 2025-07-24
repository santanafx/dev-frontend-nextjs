"use client";

import Loader from "@/components/common/atoms/Loader/Loader";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (token && user) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    }
  }, [user, token, isLoading, router]);

  return <Loader />;
}
