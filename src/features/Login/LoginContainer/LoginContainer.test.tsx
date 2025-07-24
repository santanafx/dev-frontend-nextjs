import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/auth-context";
import LoginContainer from "./LoginContainer";
import { useLogin } from "@/features/Login/hooks/useLogin/useLogin";

jest.mock("@/features/Login/hooks/useLogin/useLogin");
const mockUseLogin = useLogin as jest.MockedFunction<typeof useLogin>;

jest.mock("./Demo/Demo", () => {
  return function MockDemo() {
    return <div data-testid="demo-component">Demo Component</div>;
  };
});

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

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );

  return Wrapper;
};

describe("LoginContainer", () => {
  const mockMutateAsync = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseLogin.mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
      isError: false,
      isSuccess: false,
      error: null,
      data: undefined,
      reset: jest.fn(),
      mutate: jest.fn()
    } as any);
  });

  it("should call onSubmit when the form is submitted", async () => {
    render(<LoginContainer />, { wrapper: createWrapper() });
    const usernameInput = screen.getByPlaceholderText("Digite seu usuário");
    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    const submitButton = screen.getByText("Entrar");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        username: "testuser",
        password: "testpassword"
      });
    });
  });
});
