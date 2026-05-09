const defaultHeaders: HeadersInit = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export class ApiClientError extends Error {
  readonly status: number;
  readonly body: string;

  constructor(status: number, body: string) {
    super(`HTTP ${status}: ${body || '(empty body)'}`);
    this.name = 'ApiClientError';
    this.status = status;
    this.body = body;
  }
}

export type ApiClientOptions = {
  baseUrl: string;
  getToken?: () => string | Promise<string>;
  fetchImpl?: typeof fetch;
};

function resolveUrl(baseUrl: string, path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const base = baseUrl.replace(/\/$/, '');
  const segment = path.startsWith('/') ? path : `/${path}`;
  return `${base}${segment}`;
}

/** Thin fetch wrapper — no extra deps; swap `fetchImpl` in tests if needed. */
export function createApiClient(options: ApiClientOptions) {
  const fetchFn = options.fetchImpl ?? fetch;

  async function request<T>(
    method: string,
    path: string,
    body?: unknown,
  ): Promise<T> {
    const url = resolveUrl(options.baseUrl, path);

    const token = options.getToken ? await options.getToken() : undefined;
    const headers: HeadersInit = { ...defaultHeaders };
    if (token) {
      (headers as Record<string, string>).Authorization = `Bearer ${token}`;
    }

    const res = await fetchFn(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    const text = await res.text();
    if (!res.ok) {
      throw new ApiClientError(res.status, text);
    }
    return (text ? JSON.parse(text) : undefined) as T;
  }

  return {
    get: <T>(path: string) => request<T>('GET', path),
    post: <T>(path: string, body?: unknown) => request<T>('POST', path, body),
    put: <T>(path: string, body?: unknown) => request<T>('PUT', path, body),
    patch: <T>(path: string, body?: unknown) => request<T>('PATCH', path, body),
    delete: <T>(path: string) => request<T>('DELETE', path),
  };
}
