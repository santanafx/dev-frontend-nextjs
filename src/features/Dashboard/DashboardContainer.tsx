"use client";

import { useAuth } from "@/context/auth-context";
import React from "react";
import { useGetProducts } from "../Products/hooks/useGetProducts/useGetProducts";
import DashboardContainerSkeleton from "./DashboardContainerSkeleton";
import { Package, DollarSign, Users, BarChart3 } from "lucide-react";
import StatCard from "./StatCard/StatCard";

const DashboardContainer = () => {
  const { user } = useAuth();
  const { data: products = [], isLoading } = useGetProducts();

  const stats = {
    totalProducts: products.length,
    totalRevenue: products.reduce((sum, p) => sum + p.price, 0),
    avgPrice:
      products.length > 0
        ? products.reduce((sum, p) => sum + p.price, 0) / products.length
        : 0,
    categories: Array.from(new Set(products.map((p) => p.category))).length
  };

  if (isLoading) {
    return <DashboardContainerSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Bem-vindo, {user?.username?.split(" ")[0]}!
        </h1>
        <p className="text-muted-foreground">
          Aqui está um resumo dos seus produtos e performance.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Produtos"
          value={stats.totalProducts}
          description="produtos cadastrados"
          icon={Package}
        />
        <StatCard
          title="Categorias"
          value={stats.categories}
          description="categorias diferentes"
          icon={BarChart3}
        />
        <StatCard
          title="Receita Total"
          value={new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          }).format(stats.totalRevenue)}
          description="valor total dos produtos"
          icon={DollarSign}
        />
        <StatCard
          title="Preço Médio"
          value={new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          }).format(stats.avgPrice)}
          description="preço médio por produto"
          icon={Users}
        />
      </div>
    </div>
  );
};

export default DashboardContainer;
