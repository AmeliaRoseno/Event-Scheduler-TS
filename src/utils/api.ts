import type {
  PaginatedEvents,
  EventItem,
  AuthResponse,
  RegisterPayload,
  LoginPayload,
  CreateEventPayload,
} from "../types";

const BASE_URL = "http://localhost:3001/api";

export async function getEvents(page = 1): Promise<PaginatedEvents> {
  const response = await fetch(`${BASE_URL}/events?page=${page}`);
  const data = await response.json();
  return data;
}

export async function getEventById(id: string): Promise<EventItem> {
  const response = await fetch(`${BASE_URL}/events/${id}`);
  const data = await response.json();
  return data;
}

// Sign up a new user
export async function registerUser(userData: RegisterPayload) {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Failed to sign up. Please check your details.");
  }
  return response.json();
}

// Log in an existing user
export async function loginUser(credentials: LoginPayload): Promise<AuthResponse> {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || "Failed to log in.");
  }
  return response.json();
}

// Create a new event (requires the auth token)
export async function createEvent(eventData: CreateEventPayload, token: string): Promise<EventItem> {
  const response = await fetch(`${BASE_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || "Failed to create event.");
  }
  return response.json();
}
