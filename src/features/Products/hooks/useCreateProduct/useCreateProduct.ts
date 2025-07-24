import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "../../types/product.types";
import { QueryKeys } from "@/service/api/queryKeys";
import { apiService } from "@/service/api/config";
import { toast } from "sonner";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: Product) =>
      apiService.post<Product>(`/products`, product),
    onSuccess: () => {
      toast.success("Produto criado com sucesso!");
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PRODUCTS]
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Erro ao criar produto!";
      toast.error(errorMessage);
    }
  });
}
