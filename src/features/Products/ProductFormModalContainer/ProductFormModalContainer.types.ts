import { Product } from "../types/product.types";

export type ProductFormModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  mode: "create" | "edit";
  categories: string[];
};
