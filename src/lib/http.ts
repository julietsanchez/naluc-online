/**
 * Wrapper fetch para API. Base URL desde env, manejo de errores, tipos genéricos.
 * Listo para reemplazar por backend real.
 */

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestConfig {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
}

function getBaseURL(): string {
  if (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "");
  }
  return "";
}

export class HttpError extends Error {
  constructor(
    message: string,
    public status: number,
    public payload?: unknown
  ) {
    super(message);
    this.name = "HttpError";
  }
}

export async function request<T>(path: string, config: RequestConfig = {}): Promise<T> {
  const { method = "GET", body, headers: customHeaders = {} } = config;
  const baseURL = getBaseURL();
  const url = path.startsWith("http") ? path : `${baseURL}${path.startsWith("/") ? path : `/${path}`}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...customHeaders,
  };

  const init: RequestInit = {
    method,
    headers,
  };

  if (body !== undefined && body !== null && method !== "GET") {
    init.body = JSON.stringify(body);
  }

  let response: Response;
  try {
    response = await fetch(url, init);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error de red";
    throw new HttpError(message, 0);
  }

  let data: unknown;
  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const message =
      typeof data === "object" && data !== null && "message" in data
        ? String((data as { message: unknown }).message)
        : `Error ${response.status}: ${response.statusText}`;
    throw new HttpError(message, response.status, data);
  }

  return data as T;
}
