import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import moment from "moment";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import qs from "qs";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

export async function getServerSideProps({ query: { slug } }) {
  const query = qs.stringify({
    sort: ["date:asc"],
    populate: "image",
    filters: {
      slug: {
        $eq: slug,
      },
    },
  });

  const res = await fetch(`${API_URL}/events?${query}`);

  const event = await res.json();

  return {
    props: {
      event: event.data[0].attributes,
      eventId: event.data[0].id,
    },
  };
}

const EventPage = ({ event, eventId }) => {
  const router = useRouter();
  const { name, date, performers, description, venue, address } = event;

  let imageUrl;
  if (event.image.data) {
    imageUrl = event.image.data.attributes.formats.large.url;
  } else {
    imageUrl = "/images/event-default.png";
  }

  const handleDeleteEvent = async (e) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/events/${eventId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push("/events");
      }
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <Link
          className="flex items-center justify-center w-52 gap-2 border-2 border-gray-800 text-gray-800 px-8 py-2 rounded-md transition-all hover:text-white hover:bg-gray-800 mb-8"
          href="/events"
        >
          <FaArrowLeft /> Go Back
        </Link>

        <div className="flex gap-4">
          <Link
            href={`/events/edit/${eventId}`}
            className="flex items-center justify-center gap-2 border-2 px-8 py-2 rounded-md transition-all border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
          >
            <FaEdit /> Edit Event
          </Link>
          <button
            onClick={(e) => handleDeleteEvent(e)}
            className="flex items-center justify-center gap-2 border-2 px-8 py-2 rounded-md transition-all border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white"
          >
            <FaTrash /> Delete Event
          </button>
        </div>
      </div>

      <p className="mb-4">Date: {moment(date).format("MMM Do YYYY, h:mm A")}</p>
      <h1 className="text-2xl mb-4">{name}</h1>
      <ToastContainer />
      {event.image && (
        <Image
          className="rounded-md"
          src={imageUrl ? imageUrl : "/images/event-default.png"}
          height={600}
          width={960}
          alt={name}
        />
      )}

      <div className="my-8">
        <h3 className="mb-2 text-2xl">Performers:</h3>
        <p className="mb-2">{performers}</p>
        <h3 className="mb-2 text-2xl">Description:</h3>
        <p className="mb-2">{description}</p>
        <h3 className="mb-2 text-2xl">Venue: {venue}</h3>
        <p>{address}</p>
      </div>
    </Layout>
  );
};

export default EventPage;
