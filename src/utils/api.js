const BASE_URL = "http://localhost:8080/api";

export async function getEvents() {
    const response = await fetch(`${BASE_URL}/events`);
    const data = await response.json();
    return data;
}