import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import qs from "qs";
import { API_URL } from "@/config/index";

export async function getServerSideProps() {
  const query = qs.stringify({
    sort: ["date:asc"],
    populate: "image",
  });

  const response = await fetch(`${API_URL}/events?${query}`);
  const events = await response.json();

  return {
    props: { events: events.data },
  };
}

const EventsPage = ({ events }) => {
  return (
    <Layout>
      <h1 className="text-2xl mb-8">All Events</h1>
      {events.length === 0 && <h3>No Events to show!</h3>}
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </Layout>
  );
};

export default EventsPage;
