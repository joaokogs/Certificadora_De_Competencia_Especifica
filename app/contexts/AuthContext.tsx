"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { ApiUser } from "../types";
import apiClient from "../services/apiClient";

// Define a interface para o contexto de autenticação
interface AuthContextType {
  user: ApiUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role?: 'admin' | 'default') => Promise<void>;
  logout: () => void;
}

// Cria o contexto com um valor padrão
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define o Provedor de Autenticação
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Função para buscar dados do usuário se um token existir
  const fetchUser = async (userToken: string) => {
    try {
      const data = await apiClient.get<{ user: ApiUser }>("/api/users", userToken);
      setUser(data.user);
    } catch (error) {
      console.error("Falha ao buscar usuário, limpando token.", error);
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
    }
  };

  // Efeito para carregar o token do localStorage na inicialização
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken);
    }
    setIsLoading(false);
  }, []);

  // Função de Login
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await apiClient.post<{ token: string; user: ApiUser }>(
        "/api/auth/login",
        { email, password }
      );

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (error) {
      console.error("Falha no login:", error);
      alert("Email ou senha incorretos.");
    } finally {
      setIsLoading(false);
    }
  };

  // Função de Registro
  const register = async (name: string, email: string, password: string, role: 'admin' | 'default' = 'default') => {
    setIsLoading(true);
    try {
      const data = await apiClient.post<{ token: string; user: ApiUser }>(
        "/api/auth/register",
        { name, email, password, role }
      );

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (error) {
      console.error("Falha no registro:", error);
      alert("Erro ao registrar. O email já pode estar em uso.");
    } finally {
      setIsLoading(false);
    }
  };

  // Função de Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook customizado para usar o contexto de autenticação
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}