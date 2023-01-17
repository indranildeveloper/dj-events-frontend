import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import qs from "qs";
import { API_URL, PER_PAGE } from "@/config/index";
import Pagination from "@/components/Pagination";

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  const query = qs.stringify({
    sort: ["date:asc"],
    populate: "image",
    pagination: {
      start: start,
      limit: PER_PAGE,
    },
  });

  const response = await fetch(`${API_URL}/events?${query}`);
  const events = await response.json();

  return {
    props: {
      events: events.data,
      page: +page,
      total: events.meta.pagination.total,
    },
  };
}

const EventsPage = ({ events, page, total }) => {
  return (
    <Layout>
      <h1 className="text-2xl mb-8">All Events</h1>
      {events.length === 0 && <h3>No Events to show!</h3>}
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}

      <Pagination page={page} total={total} />
    </Layout>
  );
};

export default EventsPage;
