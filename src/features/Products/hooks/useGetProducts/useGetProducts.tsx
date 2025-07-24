import { apiService } from "@/service/api/config";
import { QueryKeys } from "@/service/api/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../../types/product.types";
import { toast } from "sonner";

export function useGetProducts() {
  const query = useQuery<Product[], Error>({
    queryKey: [QueryKeys.PRODUCTS],
    queryFn: () => apiService.get<Product[]>("/products")
  });

  if (query.error) {
    const errorMessage =
      (query.error as any).response?.data?.message ||
      "Erro ao buscar produtos!";
    toast.error(errorMessage);
  }

  return query;
}
