"use client";

import type React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateProduct } from "../hooks/useCreateProduct/useCreateProduct";
import { useUpdateProduct } from "../hooks/useUpdateProduct/useUpdateProduct";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { ProductFormModalProps } from "./ProductFormModalContainer.types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Product } from "../types/product.types";

const productFormSchema = z.object({
  title: z.string().min(1, "Nome é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  category: z.string().min(1, "Categoria é obrigatória"),
  price: z
    .string()
    .min(1, "Preço é obrigatório")
    .refine((value) => {
      const num = Number.parseFloat(value);
      return !isNaN(num) && num > 0;
    }, "Preço deve ser maior que zero"),
  image: z
    .string()
    .refine(
      (value) =>
        /^(https?):\/\/(?=.*\.[a-z]{2,})[^\s$.?#].[^\s]*$/i.test(value),
      {
        message: "Insira um url válido para a imagem"
      }
    )
});

type ProductFormData = z.infer<typeof productFormSchema>;

export function ProductFormModalContainer({
  open,
  onOpenChange,
  product,
  mode,
  categories
}: ProductFormModalProps) {
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      price: "",
      image: ""
    }
  });

  const { reset, setValue } = form;

  useEffect(() => {
    if (product && mode === "edit") {
      setValue("title", product.title);
      setValue("description", product.description);
      setValue("category", product.category);
      setValue("price", product.price.toString());
      setValue("image", product.image || "");
    } else {
      reset();
    }
  }, [product, mode, open, setValue, reset]);

  const onSubmit = async (data: ProductFormData) => {
    const productData: Omit<Product, "id"> = {
      title: data.title,
      description: data.description,
      category: data.category,
      price: Number.parseFloat(data.price),
      image: data.image ?? ""
    };

    if (mode === "create") {
      await createProductMutation.mutateAsync(productData as Product);
    } else if (product) {
      const updatedProduct: Product = {
        ...productData,
        id: product.id
      };
      await updateProductMutation.mutateAsync(updatedProduct);
    }

    onOpenChange(false);
  };

  const isLoading =
    createProductMutation.isPending || updateProductMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Novo Produto" : "Editar Produto"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Adicione um novo produto ao seu catálogo de serviços."
              : "Atualize as informações do produto."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nome do Produto <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Camiseta" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Categoria <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Descrição <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva detalhadamente o produto..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Preço (R$) <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0,00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    URL da Imagem <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://exemplo.com/imagem.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {mode === "create" ? "Criando..." : "Salvando..."}
                  </>
                ) : (
                  <>
                    {mode === "create" ? "Criar Produto" : "Salvar Alterações"}
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
