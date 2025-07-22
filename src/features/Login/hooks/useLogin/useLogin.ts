import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "../../../../service/api/config";
import { LoginCredentials, LoginResponse } from "./useLogin.types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      apiService.post<LoginResponse>(`/auth/login`, credentials),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Login realizado com sucesso!");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Credenciais inválidas";
      toast.error(errorMessage);
    }
  });
}
