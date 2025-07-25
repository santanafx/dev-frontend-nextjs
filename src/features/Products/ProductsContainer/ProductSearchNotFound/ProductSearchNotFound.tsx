import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Plus } from "lucide-react";
import React from "react";
import { ProductSearchNotFoundProps } from "./ProductSearchNotFound.types";

const ProductSearchNotFound = ({
  searchTerm,
  categoryFilter,
  setShowCreateModal
}: ProductSearchNotFoundProps) => {
  return (
    <Card className="text-center py-12" role="status" aria-live="polite">
      <CardContent>
        <Package
          className="mx-auto h-12 w-12 text-muted-foreground mb-4"
          aria-hidden="true"
        />
        <h3 className="text-lg font-semibold mb-2">
          Nenhum produto encontrado
        </h3>
        <p className="text-muted-foreground mb-4">
          {searchTerm || categoryFilter !== "all"
            ? "Tente ajustar os filtros de busca."
            : "Comece criando seu primeiro produto."}
        </p>
        {!searchTerm && categoryFilter === "all" && (
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700"
            aria-label="Criar primeiro produto"
          >
            <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
            Criar Primeiro Produto
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductSearchNotFound;
