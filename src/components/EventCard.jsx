import { Link } from "react-router";

export default function EventCard({event}) {
const { id, title, date, location } = event;

const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    year: "numeric", 
    month: "long",
    day: "numeric", 
});

return (
    <div className="card bg-base-100 shadow-md">
        <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <p>{formattedDate}</p>
            <p>{location}</p>
            <Link to={`/events/${id}`} className="btn btn-primary btn-sm mt-2">View Details</Link>
        </div>
    </div>
)

}