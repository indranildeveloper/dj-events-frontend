import Link from "next/link";
import Image from "next/image";

const EventItem = ({ event }) => {
  return (
    <div className="shadow-md mb-4 flex gap-4 rounded-md">
      <div className="m-4">
        <Image
          src={event?.image ? event.image : "/images/event-default.png"}
          alt=""
          width={170}
          height={100}
        />
      </div>

      <div className="flex items-center justify-between  w-full px-8">
        <div>
          <p className="text-sm mb-2">event.date at event.time</p>
          <h3 className="text-lg">Event Name</h3>
        </div>

        <div>
          <Link
            className="border-2 border-blue-500 text-blue-500 px-8 py-2 rounded-md transition-all hover:text-white hover:bg-blue-500"
            href={`/events/${event?.id}`}
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventItem;
