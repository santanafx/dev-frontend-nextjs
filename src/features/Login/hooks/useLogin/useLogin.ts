import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "../../../../service/api/config";
import { LoginCredentials, LoginResponse } from "./useLogin.types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { QueryKeys } from "@/service/api/queryKeys";

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { login } = useAuth();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      apiService.post<LoginResponse>(`/auth/login`, credentials),
    onSuccess: (data, variables) => {
      const userData = {
        id: "1",
        username: variables.username
      };
      login(data.token, userData);

      queryClient.invalidateQueries({ queryKey: [QueryKeys.USERS] });
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
