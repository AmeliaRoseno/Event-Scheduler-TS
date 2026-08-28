import { useState } from "react";
import { useNavigate } from "react-router";
import { createEvent } from "../utils/api";
import { getToken } from "../utils/storage";

export default function CreateEvent() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const token = getToken();

    if (!token) {
      setError("You must be signed in to create an event.");
      setLoading(false);
      return;
    }

    try {
      // Combine date + time into one ISO-friendly value the API can store
      const dateTime = new Date(`${date}T${time}`).toISOString();

      await createEvent(
        {
          title,
          description,
          date: dateTime,
          location,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
        token
      );
      navigate("/"); // back to Home to see it in the list
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create event.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <h1 className="text-2xl font-bold">Create New Event</h1>
          <p className="text-base-content/70 mb-4">
            Share your event with the community.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="label" htmlFor="title">
                <span className="label-text">Title</span>
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter event title"
                className="input input-bordered w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label" htmlFor="description">
                <span className="label-text">Description</span>
              </label>
              <textarea
                id="description"
                placeholder="Describe your event..."
                className="textarea textarea-bordered w-full"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label" htmlFor="date">
                  <span className="label-text">Date</span>
                </label>
                <input
                  id="date"
                  type="date"
                  className="input input-bordered w-full"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="label" htmlFor="time">
                  <span className="label-text">Time</span>
                </label>
                <input
                  id="time"
                  type="time"
                  className="input input-bordered w-full"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="label" htmlFor="location">
                <span className="label-text">Location (address)</span>
              </label>
              <input
                id="location"
                type="text"
                placeholder="Enter full address"
                className="input input-bordered w-full"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label" htmlFor="latitude">
                  <span className="label-text">Latitude</span>
                </label>
                <input
                  id="latitude"
                  type="number"
                  step="any"
                  placeholder="e.g. 48.1351"
                  className="input input-bordered w-full"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="label" htmlFor="longitude">
                  <span className="label-text">Longitude</span>
                </label>
                <input
                  id="longitude"
                  type="number"
                  step="any"
                  placeholder="e.g. 11.5820"
                  className="input input-bordered w-full"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && <p className="text-error text-sm">{error}</p>}

            <div className="flex justify-end gap-3 mt-2">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Creating..." : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}