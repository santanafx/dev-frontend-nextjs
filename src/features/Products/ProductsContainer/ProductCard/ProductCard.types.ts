import { UseMutationResult } from "@tanstack/react-query";
import { Product } from "../../types/product.types";

export type ProductCardProps = {
  product: Product;
  handleEdit: (product: Product) => void;
  handleDelete: (id: number) => void;
  deleteProductMutation: UseMutationResult<any, Error, string, unknown>;
};
