import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/posts`);
  const events = await res.json();

  return {
    props: { events },
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
