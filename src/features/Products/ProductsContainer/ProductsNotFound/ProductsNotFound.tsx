import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Plus } from "lucide-react";
import React from "react";

const ProductsNotFound = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
          <p className="text-muted-foreground">Gerencie seus produtos</p>
        </div>
      </div>
      <Card className="text-center py-12">
        <CardContent>
          <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            Erro ao carregar produtos
          </h3>
          <p className="text-muted-foreground mb-4">
            Ocorreu um erro ao carregar os produtos. Tente novamente.
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Tentar Novamente
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsNotFound;
