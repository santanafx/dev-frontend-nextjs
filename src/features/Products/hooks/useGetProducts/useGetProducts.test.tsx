import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetProducts } from "./useGetProducts";
import { apiService } from "@/service/api/config";
import { Product } from "../../types/product.types";
import { ReactNode } from "react";

jest.mock("@/service/api/config");
jest.mock("sonner");

const mockApiService = apiService as jest.Mocked<typeof apiService>;

describe("useGetProducts", () => {
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

  const mockProducts: Product[] = [
    {
      id: 1,
      title: "Test Product 1",
      price: 100,
      description: "Test description 1",
      category: "test",
      image: "https://www.example.com/image1.jpg"
    },
    {
      id: 2,
      title: "Test Product 2",
      price: 200,
      description: "Test description 2",
      category: "test",
      image: "https://www.example.com/image2.jpg"
    }
  ];

  it("should fetch products successfully", async () => {
    mockApiService.get.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useGetProducts(), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockApiService.get).toHaveBeenCalledWith("/products");
    expect(result.current.data).toEqual(mockProducts);
  });
});
