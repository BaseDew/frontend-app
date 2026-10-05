import { useAuth } from '../context/AuthContext';

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const useFetchWithAuth = () => {
  const { token } = useAuth() as { token: string | null };
  const baseURL = 'http://localhost:9090'; //TODO block access on any service other than apiGateway

  const authenticatedFetch = async <T = any>(
    url: string,
    options: FetchOptions = {}
  ): Promise<T> => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${baseURL}${url}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<T>;
  };

  return authenticatedFetch;
};