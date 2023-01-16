import Link from "next/link";
import Image from "next/image";
import moment from "moment";

const EventItem = ({ event }) => {
  let imageUrl;
  if (event.attributes.image.data) {
    imageUrl = event.attributes.image.data.attributes.formats.thumbnail.url;
  } else {
    imageUrl = "/images/event-default.png";
  }

  const { date, name, slug } = event.attributes;

  return (
    <div className="border p-4 shadow-md mb-4 flex gap-4 flex-col md:flex-row rounded-md">
      <div className="mt-4 md:mt-0 mx-auto">
        <Image
          className="rounded-md"
          src={imageUrl}
          alt={name}
          width={170}
          height={100}
        />
      </div>

      <div className="flex items-center justify-between w-full px-8 flex-col md:flex-row gap-6">
        <div className="text-center md:text-left">
          <p className="text-sm mb-2">
            {moment(date).format("MMM Do YYYY, h:mm A")}
          </p>
          <h3 className="text-lg">{name}</h3>
        </div>

        <div className="mb-6 md:mb-0">
          <Link
            className="border-2 border-blue-500 text-blue-500 px-8 py-2 rounded-md transition-all hover:text-white hover:bg-blue-500"
            href={`/events/${slug}`}
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventItem;
