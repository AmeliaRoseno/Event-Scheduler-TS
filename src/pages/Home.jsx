import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { getEvents } from "../utils/api";



export default function Home() {

     const [events, setEvents] = useState([]);

     useEffect(() => {
        async function fetchEvents() {
            const data = await getEvents();
            setEvents(data.results);   
        } 
        fetchEvents();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4"> {events.map((event) => ( <EventCard key={event.id} event={event } /> ))} </div>
    );
}