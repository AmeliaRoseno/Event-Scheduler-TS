import { Link } from "react-router";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-4">
      <p className="text-7xl font-extrabold text-primary mb-4">404</p>

      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
        <SearchX size={32} />
      </div>

      <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
      <p className="text-base-content/70 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>

      <Link to="/" className="btn btn-primary rounded-full mb-3">
        Go Home
      </Link>
    </div>
  );
}
