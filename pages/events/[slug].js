import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { FaArrowLeft } from "react-icons/fa";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(
    `${API_URL}/events?populate=image&filters[slug][$eq]=${slug}`
  );

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
      <p>Date: {moment(date).format("MMM Do YYYY, h:mm A")}</p>
      <h1 className="text-2xl">{name}</h1>
      {event.image && (
        <Image src={imageUrl} height={600} width={960} alt={name} />
      )}

      <h3>Performers:</h3>
      <p>{performers}</p>
      <h3>Description</h3>
      <p>{description}</p>
      <h3>Venue: {venue}</h3>
      <p>{address}</p>

      <Link href="/events">
        <FaArrowLeft /> Go Back
      </Link>
    </Layout>
  );
};

export default EventPage;
