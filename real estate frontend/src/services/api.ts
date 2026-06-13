// Payload CMS API configuration
// Use relative /api path for Vite proxy, fallback to VITE_API_URL for production
const API_URL = import.meta.env.VITE_API_URL || '';

export interface ApiParams {
  page?: number;
  limit?: number;
  locale?: string;
  sort?: string;
  depth?: number;
  [key: string]: any;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    // Clone the response so we can read it twice (once for JSON, once for text fallback)
    const clonedResponse = response.clone();
    let errorData;
    try {
      errorData = await response.json();
      console.error('[API Error] Response:', response.status, response.statusText, errorData);
    } catch {
      try {
        const text = await clonedResponse.text();
        console.error('[API Error] Response:', response.status, response.statusText, text);
        errorData = { message: text };
      } catch {
        console.error('[API Error] Response:', response.status, response.statusText);
        errorData = { message: 'Failed to read error response' };
      }
    }
    throw new ApiError(
      errorData?.error?.message || errorData?.message || `API Error: ${response.status}`,
      response.status,
      errorData
    );
  }
  return response.json();
}

export async function fetchApi<T>(
  endpoint: string,
  params?: ApiParams | string
): Promise<T> {
  let urlString = `${API_URL}${endpoint}`;
  
  if (params) {
    if (typeof params === 'string') {
      urlString = `${urlString}?${params}`;
    } else {
      const url = new URL(urlString);
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          url.searchParams.append(key, String(value));
        }
      });
      urlString = url.toString();
    }
  }

  console.log('[API] Full URL:', urlString);
  console.log('[API] Using proxy, should go to:', urlString.replace('/api', 'http://127.0.0.1:3010/api'));
  
  const response = await fetch(urlString, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log('[API] Response status:', response.status);
  console.log('[API] Response ok:', response.ok);

  return handleResponse<T>(response);
}

export async function fetchApiById<T>(endpoint: string, id: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return handleResponse<T>(response);
}

export { API_URL };