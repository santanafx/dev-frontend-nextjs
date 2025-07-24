import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUpdateProduct } from "./useUpdateProduct";
import { apiService } from "@/service/api/config";
import { toast } from "sonner";
import { Product } from "../../types/product.types";
import { ReactNode } from "react";

jest.mock("@/service/api/config");
jest.mock("sonner");

const mockApiService = apiService as jest.Mocked<typeof apiService>;
const mockToast = toast as jest.Mocked<typeof toast>;

describe("useUpdateProduct", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false }
      }
    });
    jest.clearAllMocks();
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  const mockProduct: Product = {
    id: 1,
    title: "Updated Test Product",
    price: 150,
    description: "Updated test description",
    category: "test",
    image: "https://www.example.com/updated-image.jpg"
  };

  it("should update product successfully", async () => {
    const mockResponse = { data: mockProduct };
    mockApiService.put.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useUpdateProduct(), { wrapper });

    result.current.mutate(mockProduct);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockApiService.put).toHaveBeenCalledWith(
      `/products/${mockProduct.id}`,
      mockProduct
    );
    expect(mockToast.success).toHaveBeenCalledWith(
      "Produto atualizado com sucesso!"
    );
  });
});
