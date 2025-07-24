import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCreateProduct } from "./useCreateProduct";
import { apiService } from "@/service/api/config";
import { toast } from "sonner";
import { Product } from "../../types/product.types";
import { ReactNode } from "react";

jest.mock("@/service/api/config");
jest.mock("sonner");

const mockApiService = apiService as jest.Mocked<typeof apiService>;
const mockToast = toast as jest.Mocked<typeof toast>;

describe("useCreateProduct", () => {
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
    title: "Test Product",
    price: 100,
    description: "Test description",
    category: "test",
    image: "https://www.example.com/image.jpg"
  };

  it("should create product successfully", async () => {
    const mockResponse = { data: mockProduct };
    mockApiService.post.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useCreateProduct(), { wrapper });

    result.current.mutate(mockProduct);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockApiService.post).toHaveBeenCalledWith("/products", mockProduct);
    expect(mockToast.success).toHaveBeenCalledWith(
      "Produto criado com sucesso!"
    );
  });
});
