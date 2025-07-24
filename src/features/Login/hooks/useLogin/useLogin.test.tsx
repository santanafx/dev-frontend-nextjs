import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLogin } from "./useLogin";
import { LoginCredentials } from "./useLogin.types";
import { ReactNode } from "react";
import { apiService } from "../../../../service/api/config";
import { useAuth } from "@/context/auth-context";

jest.mock("../../../../service/api/config", () => ({
  apiService: {
    post: jest.fn()
  }
}));

jest.mock("@/context/auth-context", () => ({
  useAuth: jest.fn()
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

const mockApiService = apiService as jest.Mocked<typeof apiService>;
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

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

  return Wrapper;
};

describe("useLogin", () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseAuth.mockReturnValue({
      user: null,
      token: null,
      isLoading: false,
      login: mockLogin,
      logout: jest.fn()
    });
  });

  it("should login successfully", async () => {
    const credentials: LoginCredentials = {
      username: "mor_2314",
      password: "83r5^_"
    };

    const mockResponse = { token: "test-token" };
    mockApiService.post.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper()
    });

    await result.current.mutateAsync(credentials);

    expect(mockApiService.post).toHaveBeenCalledWith(
      "/auth/login",
      credentials
    );
    expect(mockLogin).toHaveBeenCalledWith("test-token", {
      id: "1",
      username: "mor_2314"
    });
  });

  it("should fail when login returns an error", async () => {
    const credentials: LoginCredentials = {
      username: "invalid_user",
      password: "wrong_password"
    };

    const mockError = new Error("Credenciais inválidas");
    mockApiService.post.mockRejectedValue(mockError);

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper()
    });

    await expect(result.current.mutateAsync(credentials)).rejects.toThrow(
      "Credenciais inválidas"
    );
    expect(mockApiService.post).toHaveBeenCalledWith(
      "/auth/login",
      credentials
    );
  });
});
