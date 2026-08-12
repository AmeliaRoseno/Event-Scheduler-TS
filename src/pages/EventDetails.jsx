import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Calendar, MapPin, ArrowLeft } from "lucide-react";
import { getEventById } from "../utils/api";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    async function fetchEvent() {
        const data = await getEventById(id);
        setEvent(data);
    }
    fetchEvent()
  }, [id]);

  if(!event) {
    return <p>Loading...</p>;
  }

  const formattedDate = new Date(event.date).toLocaleDateString("en-GB", {
     year: "numeric",
    month: "long",
    day: "numeric",
  });

  const offset = 0.01;
  const bbox = `${event.longitude - offset},${event.latitude - offset},${event.longitude + offset},${event.latitude + offset}`;
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${event.latitude},${event.longitude}`;

  return (
    <div className="max-w-3xl mx-auto p-4">
        <Link to="/" className="btn btn-ghost btn-sm mb-4"> 
        <ArrowLeft className="w-4 h-4" />
        </Link>

        <div className="card bg-base-100 shadow-md">
            <div className="card-body">
        <h1 className="text-2xl font-bold">{event.title}</h1>

        <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
        {formattedDate}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
        <MapPin className="w-4 h-4"/>{event.location}
        </div>
        
        <p>{event.description}</p>

        <div className="w-1/2 aspect-square mt-4 mx-auto">
            <iframe title="Event Location Map" className="w-full h-full rounded-lg border" src={mapUrl}></iframe>

        </div>
    </div>
    </div>
    </div>
  );
}
