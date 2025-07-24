import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "../../types/product.types";
import { apiService } from "@/service/api/config";
import { QueryKeys } from "@/service/api/queryKeys";
import { toast } from "sonner";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: Product) =>
      apiService.put<Product>(`/products/${product.id}`, product),
    onSuccess: () => {
      toast.success("Produto atualizado com sucesso!");
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PRODUCTS]
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Erro ao atualizar o produto!";
      toast.error(errorMessage);
    }
  });
}
