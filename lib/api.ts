export interface Cat {
  id: number;
  name: string;
  experience: number;
  breed: string;
  salary: string; // Decimal from backend is serialized as string in JSON
}

export interface CatCreate {
  name: string;
  experience: number;
  breed: string;
  salary: number; // Send as number, backend converts to Decimal
}

export interface CatUpdate {
  salary: number; // Send as number, backend converts to Decimal
}

export interface ApiError {
  detail: string | { error?: string; valid_breeds?: string[] };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Helper to convert salary string to number for display/editing
export function parseSalary(salary: string): number {
  return parseFloat(salary) || 0;
}

// Helper to format salary for display
export function formatSalary(salary: string): string {
  return `$${parseFloat(salary).toFixed(2)}`;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = 'An error occurred';
    try {
      const errorData: ApiError = await response.json();
      if (typeof errorData.detail === 'string') {
        errorMessage = errorData.detail;
      } else if (errorData.detail?.error) {
        errorMessage = errorData.detail.error;
        if (errorData.detail.valid_breeds) {
          errorMessage += `\nValid breeds: ${errorData.detail.valid_breeds.slice(0, 10).join(', ')}`;
        }
      }
    } catch {
      errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    }
    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

export async function getCats(): Promise<Cat[]> {
  try {
    const response = await fetch(`${API_URL}/cats/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse<Cat[]>(response);
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(`Cannot connect to backend API at ${API_URL}. Make sure the backend is running.`);
    }
    throw error;
  }
}

export async function getCat(id: number): Promise<Cat> {
  const response = await fetch(`${API_URL}/cats/${id}`);
  return handleResponse<Cat>(response);
}

export async function createCat(cat: CatCreate): Promise<Cat> {
  try {
    const response = await fetch(`${API_URL}/cats/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cat),
    });
    return handleResponse<Cat>(response);
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(`Cannot connect to backend API at ${API_URL}. Make sure the backend is running.`);
    }
    throw error;
  }
}

export async function updateCat(id: number, update: CatUpdate): Promise<Cat> {
  try {
    const response = await fetch(`${API_URL}/cats/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(update),
    });
    return handleResponse<Cat>(response);
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(`Cannot connect to backend API at ${API_URL}. Make sure the backend is running.`);
    }
    throw error;
  }
}

export async function deleteCat(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/cats/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse<void>(response);
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(`Cannot connect to backend API at ${API_URL}. Make sure the backend is running.`);
    }
    throw error;
  }
}

