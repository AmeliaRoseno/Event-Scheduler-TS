import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { loginUser } from "../utils/api";
import { saveToken, saveEmail } from "../utils/storage";

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser({ email, password });
      // data looks like: { token: "...", user: { id, email } }
      saveToken(data.token);
      saveEmail(data.user.email);
      navigate("/"); // redirect to Home on success
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to log in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-base-200 px-4 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-md">
        <div className="card-body">
          <h1 className="text-2xl font-bold">Welcome back!</h1>
          <p className="text-base-content/70 mb-4">
            Sign in to continue to your account.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-error text-sm">{error}</p>}

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="link link-primary">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}