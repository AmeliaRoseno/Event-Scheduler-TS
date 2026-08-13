import { useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router";
import { Calendar, Search, Menu, X } from "lucide-react";
import {
  getToken,
  removeToken,
  getEmail,
  getDisplayName,
} from "../utils/storage";

const linkClasses = ({ isActive }) =>
  `text-sm font-medium transition-colors ${
    isActive ? "text-primary" : "text-base-content/70 hover:text-primary"
  }`;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const navigate = useNavigate();
  const token = getToken();
  const displayName = token ? getDisplayName(getEmail()) : "";

  function handleSignOut() {
    removeToken();
    setMenuOpen(false);
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-base-200 bg-base-100">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Logo */}
        <NavLink to="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-content">
            <Calendar size={20} />
          </span>
          <span className="text-lg font-bold text-base-content">EventsApp</span>
        </NavLink>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={linkClasses} end>
            Home
          </NavLink>
          <NavLink to="/create" className={linkClasses}>
            Create Event
          </NavLink>
        </nav>

        {/* Search - desktop only */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="hidden max-w-xs flex-1 items-center gap-2 rounded-full border border-base-200 bg-base-200/50 px-3 py-1.5 md:flex"
        >
          <Search size={16} className="text-base-content/40" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => navigate(`/?search=${e.target.value}`)}
            placeholder="Search events..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-base-content/40"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-base-content/40 hover:text-base-content"
            >
              <X size={16} />
            </button>
          )}
        </form>

        {/* Auth actions - desktop */}
        <div className="hidden items-center gap-2 md:flex">
          {token ? (
            <>
              <span className="text-sm text-base-content/70 hidden lg:inline">
                Hi, {displayName}
              </span>
              <button
                className="btn btn-ghost btn-sm rounded-full"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/signin"
                className="btn btn-outline btn-primary btn-sm rounded-full"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/signup"
                className="btn btn-primary btn-sm rounded-full"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="text-base-content md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile panel */}
      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-base-200 bg-base-100 px-4 py-3 md:hidden">
          <NavLink
            to="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-base-content/70 hover:bg-base-200"
            onClick={() => setMenuOpen(false)}
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/create"
            className="rounded-lg px-3 py-2 text-sm font-medium text-base-content/70 hover:bg-base-200"
            onClick={() => setMenuOpen(false)}
          >
            Create Event
          </NavLink>
          <div className="mt-2 flex gap-2 px-3">
            {token ? (
              <>
                <span className="text-sm text-base-content/70 px-1">
                  Hi, {displayName}
                </span>
                <button
                  className="btn btn-ghost btn-sm flex-1 rounded-full"
                  onClick={handleSignOut}
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/signin"
                  className="btn btn-outline btn-primary btn-sm flex-1 rounded-full"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/signup"
                  className="btn btn-primary btn-sm flex-1 rounded-full"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
