import { useState } from "react";
import { API_URL } from "@/config/index";

const ImageUpload = ({ eventId, imageUploaded }) => {
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "api::event.event");
    formData.append("refId", eventId);
    formData.append("field", "image");

    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      imageUploaded();
    }
  };

  return (
    <div>
      <h1 className="text-xl mb-4">Upload Event Image</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="border rounded-md p-4">
          <input
            type="file"
            className="text-sm file:mr-5 file:py-2 file:px-8 file:rounded-md file:border-0
            file:font-semibold file:text-white
            file:bg-blue-500
            hover:file:cursor-pointer hover:file:opacity-80"
            onChange={(e) => handleFileChange(e)}
          />
        </div>
        <button
          className="border-2 border-blue-500 text-blue-500 rounded-md transition-all mt-4 px-6 py-2 hover:bg-blue-500 hover:text-white"
          type="submit"
        >
          Upload Image
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;
