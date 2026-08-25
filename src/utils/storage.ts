// Save the login token after a successful sign in/sign up
export function saveToken(token: string): void {
  localStorage.setItem("token", token);
}

// Read the token (returns null if not signed in)
export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function saveEmail(email: string): void {
  localStorage.setItem("email", email);
}

export function getEmail(): string | null {
  return localStorage.getItem("email");
}

// Remove the token and email — used when signing out
export function removeToken(): void {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
}

// Since the API doesn't persist a real "name" field, we derive a
// friendly display name from the part of the email before the "@".
// e.g. "presley.boyle@email.com" -> "Presley.boyle"
export function getDisplayName(): string {
  const email = getEmail();
  if (!email) return "Guest";
  const prefix = email.split("@")[0];
  return prefix.charAt(0).toUpperCase() + prefix.slice(1);
}