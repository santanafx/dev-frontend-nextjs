import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLogin } from "./useLogin";
import { apiService } from "../../../../service/api/config";
import { LoginCredentials } from "./useLogin.types";
import { ReactNode } from "react";

jest.mock("../../../../service/api/config");
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn()
  })
}));

const mockApiService = apiService as jest.Mocked<typeof apiService>;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  Wrapper.displayName = "TestWrapper";
  return Wrapper;
};

describe("useLogin - Teste do Endpoint", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve chamar o endpoint de login corretamente", async () => {
    const credentials: LoginCredentials = {
      username: "mor_2314",
      password: "83r5^_"
    };

    mockApiService.post.mockResolvedValue({ token: "test-token" });

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper()
    });

    await result.current.mutateAsync(credentials);

    expect(mockApiService.post).toHaveBeenCalledWith(
      "/auth/login",
      credentials
    );
  });

  it("deve falhar quando o endpoint retorna erro", async () => {
    const credentials: LoginCredentials = {
      username: "invalid_user",
      password: "wrong_password"
    };

    mockApiService.post.mockRejectedValue(new Error("Invalid credentials"));

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper()
    });

    await expect(result.current.mutateAsync(credentials)).rejects.toThrow(
      "Invalid credentials"
    );
    expect(mockApiService.post).toHaveBeenCalledWith(
      "/auth/login",
      credentials
    );
  });
});
