import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { useGetProduct } from "./useGetProduct";
import { apiService } from "@/service/api/config";
import { Product } from "../../types/product.types";

jest.mock("@/service/api/config");
jest.mock("sonner");

const mockApiService = apiService as jest.Mocked<typeof apiService>;

describe("useGetProduct", () => {
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

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  const mockProduct: Product = {
    id: 1,
    title: "Test Product",
    price: 100,
    description: "Test description",
    category: "test",
    image: "https://www.example.com/image.jpg"
  };

  it("should fetch product successfully", async () => {
    const productId = "1";
    mockApiService.get.mockResolvedValue(mockProduct);

    const { result } = renderHook(() => useGetProduct({ id: productId }), {
      wrapper
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockApiService.get).toHaveBeenCalledWith(`/products/${productId}`);
    expect(result.current.data).toEqual(mockProduct);
  });
});
