"use client";

import { useState } from "react";
import { useGetProducts } from "../hooks/useGetProducts/useGetProducts";
import { useDeleteProduct } from "../hooks/useDeleteProduct/useDeleteProduct";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import { ProductFormModalContainer } from "../ProductFormModalContainer/ProductFormModalContainer";
import { Product } from "../types/product.types";
import ProductsContainerSkeleton from "./ProductsContainerSkeleton/ProductsContainerSkeleton";
import ProductsNotFound from "./ProductsNotFound/ProductsNotFound";
import Header from "@/components/common/atoms/Header/Header";
import ProductCard from "./ProductCard/ProductCard";
import ProductSearchNotFound from "./ProductSearchNotFound/ProductSearchNotFound";

const ProductsContainer = () => {
  const { data: products = [], isLoading, error } = useGetProducts();
  const deleteProductMutation = useDeleteProduct();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter((product: Product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(
    new Set(products.map((p: Product) => p.category))
  );

  const handleDelete = async (id: number) => {
    await deleteProductMutation.mutateAsync(id.toString());
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleCloseModals = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setSelectedProduct(null);
  };

  if (isLoading) {
    return <ProductsContainerSkeleton />;
  }

  if (error) {
    return <ProductsNotFound />;
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Header title={"Produtos"} description={"Gerencie seus produtos"} />
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700"
            aria-label="Adicionar novo produto"
          >
            <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
            Novo Produto
          </Button>
        </div>
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
              aria-hidden="true"
            />
            <Input
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              aria-label="Buscar produtos por título ou descrição"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger
              className="w-full sm:w-[200px]"
              aria-label="Filtrar por categoria"
            >
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {filteredProducts.length === 0 ? (
          <ProductSearchNotFound
            searchTerm={searchTerm}
            categoryFilter={categoryFilter}
            setShowCreateModal={setShowCreateModal}
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product: Product, index: number) => (
              <ProductCard
                key={product.id}
                product={product}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                deleteProductMutation={deleteProductMutation}
                isFirstImage={index < 3}
              />
            ))}
          </div>
        )}
      </div>
      <ProductFormModalContainer
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        mode="create"
        categories={categories}
      />
      <ProductFormModalContainer
        open={showEditModal}
        onOpenChange={handleCloseModals}
        product={selectedProduct}
        mode="edit"
        categories={categories}
      />
    </>
  );
};

export default ProductsContainer;
