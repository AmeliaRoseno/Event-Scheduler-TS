// Save the login token after a successful sign in/sign up
export function saveToken(token) {
  localStorage.setItem("token", token);
}

// Read the token (returns null if not signed in)
export function getToken() {
  return localStorage.getItem("token");
}

// Remove the token and email — used when signing out
export function removeToken() {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
}

// Since the API doesn't persist a real "name" field, we derive a
// friendly display name from the part of the email before the "@".
// e.g. "presley.boyle@email.com" -> "Presley.boyle"
export function getDisplayName(email) {
  if (!email) return "";
  const namePart = email.split("@")[0];
  return namePart.charAt(0).toUpperCase() + namePart.slice(1);
}

// Save the user's email after login/signup, so we can greet them later
export function saveEmail(email) {
  localStorage.setItem("email", email);
}

// Read the saved email (returns null if not signed in)
export function getEmail() {
  return localStorage.getItem("email");
}