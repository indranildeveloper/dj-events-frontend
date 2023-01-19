import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/index";
import DashboardEvent from "@/components/DashboardEvent";

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/events/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();

  return {
    props: {
      events,
      token,
    },
  };
}

const DashboardPage = ({ events, token }) => {
  const router = useRouter();

  const handleDeleteEvent = async (eventId) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/events/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        // router.push("/events");
        router.reload();
      }
    }
  };

  return (
    <Layout title="User dashboard">
      <div>
        <h1 className="text-2xl mb-4">Dashboard</h1>
        <h3 className="text-blue-500 text-lg mb-4">My Events</h3>

        {events.map((event) => (
          <DashboardEvent
            key={event.id}
            event={event}
            handleDeleteEvent={() => handleDeleteEvent(event.id)}
          />
        ))}
      </div>
    </Layout>
  );
};

export default DashboardPage;
