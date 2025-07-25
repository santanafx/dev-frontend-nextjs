import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Tag } from "lucide-react";
import React from "react";
import { ProductInformationsProps } from "./ProductInformations.types";

const ProductInformations = ({ product }: ProductInformationsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle id="product-info-heading">Informações</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4" role="list">
          <li className="flex items-center justify-between">
            <div className="flex items-center">
              <DollarSign
                className="mr-2 h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
              <span className="text-sm font-medium">Preço</span>
            </div>
            <span className="text-lg font-bold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(product.price)}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <div className="flex items-center">
              <Tag
                className="mr-2 h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
              <span className="text-sm font-medium">Categoria</span>
            </div>
            <span className="text-sm">{product.category}</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default ProductInformations;
