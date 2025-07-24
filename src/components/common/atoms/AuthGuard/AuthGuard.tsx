"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { AuthGuardProps } from "./AuthGuard.types";
import Loader from "../Loader/Loader";

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <Loader text="Carregando..." />;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
