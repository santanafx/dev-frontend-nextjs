import { apiService } from "@/service/api/config";
import { QueryKeys } from "@/service/api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) =>
      apiService.delete<void>(`/products/${productId}`),
    onSuccess: () => {
      toast.success("Produto deletado com sucesso!");
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PRODUCTS]
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Erro ao deletar produto!";
      toast.error(errorMessage);
    }
  });
}
