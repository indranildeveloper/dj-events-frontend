import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { FaArrowLeft } from "react-icons/fa";
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
    },
  };
}

const EventPage = ({ event }) => {
  const { name, date, performers, description, venue, address } = event;

  const imageUrl = event.image.data.attributes.formats.large.url;

  return (
    <Layout>
      <Link
        className="flex items-center justify-center w-52 gap-2 border-2 border-gray-800 text-gray-800 px-8 py-2 rounded-md transition-all hover:text-white hover:bg-gray-800 mb-8"
        href="/events"
      >
        <FaArrowLeft /> Go Back
      </Link>
      <p className="mb-4">Date: {moment(date).format("MMM Do YYYY, h:mm A")}</p>
      <h1 className="text-2xl mb-4">{name}</h1>
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
