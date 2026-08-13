import { Link } from "react-router";
import { Lock } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
        <Lock size={36} />
      </div>

      <h1 className="text-2xl font-bold mb-2">Not Authorized</h1>
      <p className="text-base-content/70 mb-6">
        You need to sign in to access this page.
      </p>

      <Link to="/signin" className="btn btn-primary rounded-full mb-3">
        Go to Sign In
      </Link>
      <Link to="/" className="link link-primary text-sm">
        ← Back to Home
      </Link>
    </div>
  );
}
