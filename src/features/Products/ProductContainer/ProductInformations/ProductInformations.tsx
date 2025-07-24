import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Tag } from "lucide-react";
import React from "react";
import { ProductInformationsProps } from "./ProductInformations.types";

const ProductInformations = ({ product }: ProductInformationsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Preço</span>
          </div>
          <span className="text-lg font-bold">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL"
            }).format(product.price)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Categoria</span>
          </div>
          <span className="text-sm">{product.category}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductInformations;
