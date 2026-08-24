export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  latitude: number;
  longitude: number;
}

export interface PaginatedEvents {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    results: EventItem[];
}

export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

// Payload shapes for requests (what YOU send, not what you get back)
export interface RegisterPayload {
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// Note: no "category" field — API doesn't support it
export interface CreateEventPayload {
  title: string;
  description: string;
  date: string;
  location: string;
  latitude: number;
  longitude: number;
}