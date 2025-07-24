import React from "react";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductFormModalContainer } from "./ProductFormModalContainer";

// Mock dos hooks
jest.mock("../hooks/useCreateProduct/useCreateProduct", () => ({
  useCreateProduct: () => ({
    mutateAsync: jest.fn(),
    isPending: false
  })
}));

jest.mock("../hooks/useUpdateProduct/useUpdateProduct", () => ({
  useUpdateProduct: () => ({
    mutateAsync: jest.fn(),
    isPending: false
  })
}));

// Mock do toast
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

// Wrapper para fornecer o QueryClient
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  Wrapper.displayName = "TestWrapper";

  return Wrapper;
};

const mockCategories = ["Eletrônicos", "Roupas", "Livros"];

const defaultProps = {
  open: true,
  onOpenChange: jest.fn(),
  mode: "create" as const,
  categories: mockCategories
};

describe("ProductFormModalContainer", () => {
  it("should render the create modal correctly", () => {
    render(<ProductFormModalContainer {...defaultProps} />, {
      wrapper: createWrapper()
    });

    expect(screen.getByText("Novo Produto")).toBeInTheDocument();
    expect(
      screen.getByText("Adicione um novo produto ao seu catálogo de serviços.")
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome do Produto/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Categoria/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descrição/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Preço/)).toBeInTheDocument();
    expect(screen.getByLabelText(/URL da Imagem/)).toBeInTheDocument();
  });
});
