import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { FileText } from "lucide-react";
import Image from "next/image";
import { ProductDetailsProps } from "./ProductDetails.types";

const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
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
  );
};

export default ProductDetails;
