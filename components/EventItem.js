import Link from "next/link";
import Image from "next/image";
import moment from "moment";

const EventItem = ({ event }) => {
  const imageUrl = event.attributes.image.data.attributes.formats.thumbnail.url;

  const { date, name, slug } = event.attributes;

  return (
    <div className="shadow-md mb-4 flex gap-4 rounded-md">
      <div className="m-4">
        <Image
          className="rounded-md"
          src={imageUrl}
          alt=""
          width={170}
          height={100}
        />
      </div>

      <div className="flex items-center justify-between  w-full px-8">
        <div>
          <p className="text-sm mb-2">
            {moment(date).format("MMM Do YYYY, h:mm A")}
          </p>
          <h3 className="text-lg">{name}</h3>
        </div>

        <div>
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
