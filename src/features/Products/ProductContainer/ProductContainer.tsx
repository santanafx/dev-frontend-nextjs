"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useGetProduct } from "../hooks/useGetProduct/useGetProduct";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ProductNotFound from "./ProductNotFound/ProductNotFound";
import ProductContainerSkeleton from "./ProductContainerSkeleton/ProductContainerSkeleton";
import ProductDetails from "./ProductDetails/ProductDetails";
import ProductInformations from "./ProductInformations/ProductInformations";

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
          <ProductDetails product={product} />
        </div>
        <div className="space-y-6">
          <ProductInformations product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductContainer;
