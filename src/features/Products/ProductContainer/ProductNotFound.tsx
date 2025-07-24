import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const ProductNotFound = () => {
  return (
    <div className="text-center py-12">
      <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
      <p className="text-muted-foreground mb-6">
        O produto que você está procurando não existe ou foi removido.
      </p>
      <Button asChild>
        <Link href="/products">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Produtos
        </Link>
      </Button>
    </div>
  );
};

export default ProductNotFound;
