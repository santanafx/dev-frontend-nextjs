"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useGetProduct } from "../hooks/useGetProduct/useGetProduct";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { ArrowLeft, DollarSign, Tag, FileText } from "lucide-react";
import Image from "next/image";
import ProductNotFound from "./ProductNotFound/ProductNotFound";
import ProductContainerSkeleton from "./ProductContainerSkeleton/ProductContainerSkeleton";

const ProductContainer = () => {
  const params = useParams();
  const {
    data: product,
    isLoading,
    error
  } = useGetProduct({ id: params.id as string });

  if (isLoading) {
    return <ProductContainerSkeleton />;
  }

  if (error || !product) {
    return <ProductNotFound />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/products">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {product.title}
            </h1>
            <p className="text-muted-foreground">{product.category}</p>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Detalhes do Produto</CardTitle>
                  <CardDescription>
                    Informações completas sobre o produto
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video relative mb-6 rounded-lg overflow-hidden">
                <Image
                  src={
                    product.image ||
                    "/placeholder.svg?height=400&width=600&query=product+detail"
                  }
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    Descrição
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
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
        </div>
      </div>
    </div>
  );
};

export default ProductContainer;
