import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Edit, Eye, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ProductCardProps } from "./ProductCard.types";

const ProductCard = ({
  product,
  handleEdit,
  handleDelete,
  deleteProductMutation,
  isFirstImage = false
}: ProductCardProps & { isFirstImage?: boolean }) => {
  return (
    <Card
      key={product.id}
      className="overflow-hidden hover:shadow-lg transition-shadow duration-200"
    >
      <div className="aspect-video relative">
        <Image
          src={
            product.image ||
            "/placeholder.svg?height=200&width=300&query=product"
          }
          alt={`Imagem do produto ${product.title}`}
          fill
          priority={isFirstImage}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="line-clamp-2 text-lg">{product.title}</CardTitle>
        <CardDescription className="line-clamp-3 text-sm">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-muted-foreground bg-gray-100 px-2 py-1 rounded-md">
            {product.category}
          </span>
          <span className="text-lg font-bold text-blue-600">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL"
            }).format(product.price)}
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1 bg-transparent"
          >
            <Link
              href={`/products/${product.id}`}
              aria-label={`Ver detalhes do produto ${product.title}`}
            >
              <Eye className="mr-2 h-4 w-4" aria-hidden="true" />
              Ver
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 bg-transparent"
            onClick={() => handleEdit(product)}
            aria-label={`Editar produto ${product.title}`}
          >
            <Edit className="mr-2 h-4 w-4" aria-hidden="true" />
            Editar
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                disabled={deleteProductMutation.isPending}
                aria-label={`Excluir produto ${product.title}`}
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Excluir</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                <AlertDialogDescription>
                  {`Tem certeza que deseja excluir ${product.title}
                ? Esta ação não pode ser desfeita.`}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-600 hover:bg-red-700"
                  disabled={deleteProductMutation.isPending}
                >
                  {deleteProductMutation.isPending ? "Excluindo..." : "Excluir"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
