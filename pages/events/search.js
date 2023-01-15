import qs from "qs";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";
import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    sort: ["date:asc"],
    populate: "image",
    filters: {
      $or: [
        {
          name: {
            $contains: term,
          },
        },

        {
          performers: {
            $contains: term,
          },
        },
        {
          description: {
            $contains: term,
          },
        },
        {
          venue: {
            $contains: term,
          },
        },
      ],
    },
  });

  const response = await fetch(`${API_URL}/events?${query}`);
  const events = await response.json();

  return {
    props: { events: events.data },
  };
}

const SearchPage = ({ events }) => {
  const router = useRouter();

  return (
    <Layout title="Search Results">
      <Link
        className="flex items-center justify-center w-52 gap-2 border-2 border-gray-800 text-gray-800 px-8 py-2 rounded-md transition-all hover:text-white hover:bg-gray-800 mb-8"
        href="/events"
      >
        <FaArrowLeft /> Go Back
      </Link>
      <h1 className="text-2xl mb-8">Search Results for {router.query.term}</h1>
      {events.length === 0 && <h3>No Events to show!</h3>}
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </Layout>
  );
};

export default SearchPage;
