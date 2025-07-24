import { apiService } from "@/service/api/config";
import { QueryKeys } from "@/service/api/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../../types/product.types";
import { UseGetProductProps } from "./useGetProduct.types";
import { toast } from "sonner";

export function useGetProduct({ id }: UseGetProductProps) {
  const query = useQuery<Product>({
    queryKey: [QueryKeys.PRODUCT, id],
    queryFn: () => apiService.get<Product>(`/products/${id}`)
  });

  if (query.error) {
    const errorMessage =
      (query.error as any).response?.data?.message || "Erro ao buscar produto!";
    toast.error(errorMessage);
  }

  return query;
}
