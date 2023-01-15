import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import Link from "next/link";
import qs from "qs";
import { API_URL } from "@/config/index";

export async function getServerSideProps() {
  const query = qs.stringify({
    sort: ["date:asc"],
    populate: "image",
    pagination: {
      pageSize: 3,
    },
  });

  const response = await fetch(`${API_URL}/events?${query}`);
  const events = await response.json();

  return {
    props: { events: events.data },
  };
}

const HomePage = ({ events }) => {
  return (
    <Layout>
      <h1 className="text-2xl mb-8">Upcoming Events</h1>
      {events.length === 0 && <h3>No Events to show!</h3>}
      <div className="mb-20">
        {events.map((event) => (
          <EventItem key={event.id} event={event} />
        ))}
        <div className="my-16">
          {events.length > 0 && (
            <Link
              className="border-2 border-gray-800 text-gray-800 px-8 py-2 rounded-md transition-all hover:text-white hover:bg-gray-800"
              href="/events"
            >
              View All Events
            </Link>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
