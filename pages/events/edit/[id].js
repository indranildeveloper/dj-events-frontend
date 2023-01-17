import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { FaArrowLeft, FaImage } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import { API_URL } from "@/config/index";

export async function getServerSideProps({ params: { id }, req }) {
  const res = await fetch(`${API_URL}/events/${id}?populate=image`);
  const event = await res.json();

  return {
    props: {
      event: event.data.attributes,
      eventId: id,
    },
  };
}

const EditEventPage = ({ event, eventId }) => {
  const [formData, setFormData] = useState({
    name: event.name,
    performers: event.performers,
    venue: event.venue,
    address: event.address,
    date: event.date,
    description: event.description,
  });

  const [imagePreview, setImagePreview] = useState(
    event.image.data ? event.image.data.attributes.formats.small.url : null
  );

  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const { name, performers, venue, address, date, description } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    const hasEmptyFields = Object.values(formData).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      toast.error("Please fill in all fields!");
    }

    try {
      const res = await fetch(`${API_URL}/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: formData,
        }),
      });

      if (!res.ok) {
        toast.error("Something went wrong!");
      } else {
        const event = await res.json();
        router.push(`/events/${event.data.attributes.slug}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const imageUploaded = async (e) => {
    const res = await fetch(`${API_URL}/events/${eventId}?populate=image`);
    const event = await res.json();
    setImagePreview(
      event.data.attributes.image.data.attributes.formats.small.url
    );
    setShowModal(false);
  };

  return (
    <Layout title="Edit Event">
      <Link
        className="flex items-center justify-center w-52 gap-2 border-2 border-gray-800 text-gray-800 px-8 py-2 rounded-md transition-all hover:text-white hover:bg-gray-800 mb-8"
        href="/events"
      >
        <FaArrowLeft /> Go Back
      </Link>
      <h1 className="text-2xl">Edit Event</h1>
      <ToastContainer />

      <h2 className="mt-4 mb-2 text-xl">Event Image</h2>
      {imagePreview ? (
        <Image
          className="rounded-md"
          src={imagePreview}
          height={200}
          width={270}
          alt={name}
        />
      ) : (
        <div>
          <p>No Image Uploaded!</p>
        </div>
      )}

      <div>
        <button
          onClick={() => setShowModal(true)}
          className="border-2 border-blue-500 text-blue-500 mt-2 px-4 py-2 flex items-center justify-center gap-2 rounded-md transition-all hover:text-white hover:bg-blue-500"
        >
          <FaImage /> Set Image
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload
          eventId={eventId}
          imageUploaded={(e) => imageUploaded(e)}
        />
      </Modal>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Event Name</label>
            <input
              className="border-2 border-gray-500 p-2 rounded-md outline-none transition-all duration-300 focus:border-blue-500"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="performers">Performers</label>
            <input
              className="border-2 border-gray-500 p-2 rounded-md outline-none transition-all duration-300 focus:border-blue-500"
              type="text"
              id="performers"
              name="performers"
              value={performers}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="venue">Venue</label>
            <input
              className="border-2 border-gray-500 p-2 rounded-md outline-none transition-all duration-300 focus:border-blue-500"
              type="text"
              id="venue"
              name="venue"
              value={venue}
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="date">Date</label>
            <input
              className="border-2 border-gray-500 p-2 rounded-md outline-none transition-all duration-300 focus:border-blue-500"
              type="datetime-local"
              id="date"
              name="date"
              value={moment(date).format("YYYY-MM-DD HH:mm")}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="address">Address</label>
            <input
              className="border-2 border-gray-500 p-2 rounded-md outline-none transition-all duration-300 focus:border-blue-500"
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description">Description</label>
            <textarea
              className="border-2 border-gray-500 p-2 rounded-md outline-none transition-all resize-none duration-300 focus:border-blue-500"
              rows="8"
              id="description"
              name="description"
              value={description}
              onChange={(e) => handleInputChange(e)}
            ></textarea>
          </div>
        </div>
        <button
          className="mt-4 px-8 py-2 rounded-md border-2 border-blue-500 text-blue-500 transition-all hover:bg-blue-500 hover:text-white"
          type="submit"
        >
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default EditEventPage;
