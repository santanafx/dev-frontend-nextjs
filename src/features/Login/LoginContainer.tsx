"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../../components/ui/card";
import { Building2, Loader2 } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../components/ui/input";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Button } from "../../components/ui/button";
import { useLogin } from "@/features/Login/hooks/useLogin/useLogin";
import Demo from "./Demo";
import ErrorMessage from "@/components/common/atoms/ErrorMessage/ErrorMessage";

const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Usuário é obrigatório")
    .min(3, "Usuário deve ter pelo menos 3 caracteres"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres")
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginContainer = () => {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    await loginMutation.mutateAsync(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Building2 className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">ConsultPro</CardTitle>
          <CardDescription>
            Entre na sua conta para acessar o sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                type="text"
                placeholder="Digite seu usuário"
                disabled={loginMutation.isPending}
                {...register("username")}
                className={errors.username ? "border-red-500" : ""}
              />
              {errors.username && (
                <ErrorMessage error={errors.username.message} />
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                disabled={loginMutation.isPending}
                {...register("password")}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <ErrorMessage error={errors.password.message} />
              )}
            </div>
            {errors.root && (
              <Alert variant="destructive">
                <AlertDescription>{errors.root.message}</AlertDescription>
              </Alert>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
          <Demo />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginContainer;
