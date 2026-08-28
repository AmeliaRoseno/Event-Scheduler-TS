import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-base-200">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
