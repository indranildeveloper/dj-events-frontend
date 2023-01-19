import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";

const DashboardEvent = ({ event, handleDeleteEvent }) => {
  return (
    <div className="flex items-center justify-between mb-4 border rounded-md shadow-md p-4">
      <h4 className="text-xl">
        <Link href={`/events/${event.slug}`}>{event.name}</Link>
      </h4>

      <div className="flex gap-4">
        <Link
          href={`/events/edit/${event.id}`}
          className="flex items-center justify-center gap-2 border-2 px-8 py-2 rounded-md transition-all border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
        >
          <FaEdit /> Edit Event
        </Link>
        <button
          onClick={() => handleDeleteEvent(event.id)}
          className="flex items-center justify-center gap-2 border-2 px-8 py-2 rounded-md transition-all border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white"
        >
          <FaTrash /> Delete Event
        </button>
      </div>
    </div>
  );
};

export default DashboardEvent;
