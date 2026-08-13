import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { getEvents } from "../utils/api";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      const data = await getEvents(currentPage);
      setEvents(data.results);
      setTotalPages(data.totalPages);
      setLoading(false);
    }
    fetchEvents();
  }, [currentPage]);

  function goToPage(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-1">Upcoming Events</h1>
      <p className="text-base-content/70 mb-4">
        Discover and join amazing events happening around you.
      </p>

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      <div className="flex justify-center items-center gap-2 mt-8">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`btn btn-sm ${
              page === currentPage ? "btn-primary" : "btn-ghost"
            }`}
            onClick={() => goToPage(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}