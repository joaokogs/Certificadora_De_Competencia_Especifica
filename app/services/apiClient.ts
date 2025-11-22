const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://certificadora-de-compet-ncia.onrender.com"

interface RequestOptions {
  method: string;
  headers: HeadersInit;
  body?: string;
  cache?: RequestCache;
  next?: { revalidate?: number };
}


const apiClient = {
  async request<T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body?: unknown,
    token?: string | null
  ): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const config: RequestOptions = {
      method: method,
      headers: headers,
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    // Para GET requests, podemos querer forçar o 'no-cache'
    if (method === "GET") {
      config.cache = "no-store";
      config.next = { revalidate: 0 };
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          errorData = { error: "Erro desconhecido na resposta da API" };
        }
        console.error("Erro da API:", errorData);
        throw new Error(errorData.msg || errorData.error || "Erro na API");
      }

      // Retorna JSON se o 'Content-Type' for 'application/json'
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return (await response.json()) as T;
      }

      // Retorna texto se não for JSON (ex: DELETE pode não retornar corpo)
      const textData = await response.text();
      // Tenta fazer parse se for um JSON literal, senão retorna o texto
      try {
        return JSON.parse(textData) as T;
      } catch (e) {
        return textData as unknown as T;
      }

    } catch (error) {
      console.error(`Falha na requisição ${method} ${endpoint}:`, error);
      throw error;
    }
  },

  get<T>(endpoint: string, token?: string | null): Promise<T> {
    return this.request<T>(endpoint, "GET", null, token);
  },

  post<T>(endpoint: string, body: unknown, token?: string | null): Promise<T> {
    return this.request<T>(endpoint, "POST", body, token);
  },

  put<T>(endpoint: string, body: unknown, token?: string | null): Promise<T> {
    return this.request<T>(endpoint, "PUT", body, token);
  },

  delete<T>(endpoint: string, token?: string | null): Promise<T> {
    return this.request<T>(endpoint, "DELETE", null, token);
  },
};

export default apiClient;