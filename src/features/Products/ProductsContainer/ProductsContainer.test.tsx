import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductsContainer from "./ProductsContainer";
import { useGetProducts } from "../hooks/useGetProducts/useGetProducts";
import { useDeleteProduct } from "../hooks/useDeleteProduct/useDeleteProduct";
import { Product } from "../types/product.types";

jest.mock("../hooks/useGetProducts/useGetProducts");
jest.mock("../hooks/useDeleteProduct/useDeleteProduct");

const mockUseGetProducts = useGetProducts as jest.MockedFunction<
  typeof useGetProducts
>;
const mockUseDeleteProduct = useDeleteProduct as jest.MockedFunction<
  typeof useDeleteProduct
>;

jest.mock("../ProductFormModalContainer/ProductFormModalContainer", () => ({
  ProductFormModalContainer: ({
    open,
    mode
  }: {
    open: boolean;
    mode: string;
  }) => (
    <div
      data-testid={`modal-${mode}`}
      style={{ display: open ? "block" : "none" }}
    >
      {mode === "create" ? "Create Modal" : "Edit Modal"}
    </div>
  )
}));

// Mock dos componentes filhos
jest.mock("./ProductCard/ProductCard", () => ({
  __esModule: true,
  default: ({
    product,
    handleEdit
  }: {
    product: Product;
    // eslint-disable-next-line
    handleEdit: (productToEdit: Product) => void;
  }) => (
    <div data-testid={`product-card-${product.id}`}>
      <span>{product.title}</span>
      <button onClick={() => handleEdit(product)}>Edit</button>
    </div>
  )
}));

jest.mock("./ProductsContainerSkeleton/ProductsContainerSkeleton", () => ({
  __esModule: true,
  default: () => <div data-testid="skeleton">Loading...</div>
}));

jest.mock("./ProductsNotFound/ProductsNotFound", () => ({
  __esModule: true,
  default: () => <div data-testid="not-found">Products not found</div>
}));

jest.mock("./ProductSearchNotFound/ProductSearchNotFound", () => ({
  __esModule: true,
  default: ({
    setShowCreateModal
  }: {
    // eslint-disable-next-line
    setShowCreateModal: (show: boolean) => void;
  }) => (
    <div data-testid="search-not-found">
      <button onClick={() => setShowCreateModal(true)}>Create Product</button>
    </div>
  )
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return Wrapper;
};

const mockProducts: Product[] = [
  {
    id: 1,
    title: "iPhone 15",
    price: 999,
    description: "Latest iPhone model",
    category: "Eletrônicos",
    image: "https://example.com/iphone.jpg"
  },
  {
    id: 2,
    title: "Camiseta Básica",
    price: 29.99,
    description: "Camiseta de algodão",
    category: "Roupas",
    image: "https://example.com/camiseta.jpg"
  }
];

describe("ProductsContainer", () => {
  const mockMutateAsync = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseGetProducts.mockReturnValue({
      data: mockProducts,
      isLoading: false,
      error: null,
      isSuccess: true,
      isError: false,
      refetch: jest.fn()
    } as any);

    mockUseDeleteProduct.mockReturnValue({
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

  describe("searchTerm functionality", () => {
    it("should filter products based on search term", () => {
      render(<ProductsContainer />, { wrapper: createWrapper() });

      const searchInput = screen.getByPlaceholderText("Buscar produtos...");
      fireEvent.change(searchInput, { target: { value: "iPhone" } });

      expect(screen.getByText("iPhone 15")).toBeInTheDocument();
      expect(screen.queryByText("Camiseta Básica")).not.toBeInTheDocument();
    });
  });

  describe("categoryFilter functionality", () => {
    it("should filter products by category", () => {
      render(<ProductsContainer />, { wrapper: createWrapper() });

      const categorySelect = screen.getByRole("combobox");
      fireEvent.click(categorySelect);
      const eletronicosOption = screen.getByText("Eletrônicos");
      fireEvent.click(eletronicosOption);

      expect(screen.getByText("iPhone 15")).toBeInTheDocument();
      expect(screen.queryByText("Camiseta Básica")).not.toBeInTheDocument();
    });
  });

  describe("showCreateModal functionality", () => {
    it("should open the create modal when the 'Novo Produto' button is clicked", () => {
      render(<ProductsContainer />, { wrapper: createWrapper() });

      const createButton = screen.getByText("Novo Produto");
      fireEvent.click(createButton);

      expect(screen.getByTestId("modal-create")).toBeInTheDocument();
    });
  });

  describe("showEditModal functionality", () => {
    it("should open the edit modal when the Edit button is clicked", () => {
      render(<ProductsContainer />, { wrapper: createWrapper() });

      const editButtons = screen.getAllByText("Edit");
      fireEvent.click(editButtons[0]);

      expect(screen.getByTestId("modal-edit")).toBeInTheDocument();
    });
  });
});
