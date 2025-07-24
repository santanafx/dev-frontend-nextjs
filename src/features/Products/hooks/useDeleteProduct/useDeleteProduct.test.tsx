import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDeleteProduct } from "./useDeleteProduct";
import { apiService } from "@/service/api/config";
import { toast } from "sonner";
import { ReactNode } from "react";

jest.mock("@/service/api/config");
jest.mock("sonner");

const mockApiService = apiService as jest.Mocked<typeof apiService>;
const mockToast = toast as jest.Mocked<typeof toast>;

describe("useDeleteProduct", () => {
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

  it("should delete product successfully", async () => {
    const productId = "123";
    mockApiService.delete.mockResolvedValue({});

    const { result } = renderHook(() => useDeleteProduct(), { wrapper });

    result.current.mutate(productId);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockApiService.delete).toHaveBeenCalledWith(
      `/products/${productId}`
    );
    expect(mockToast.success).toHaveBeenCalledWith(
      "Produto deletado com sucesso!"
    );
  });
});
