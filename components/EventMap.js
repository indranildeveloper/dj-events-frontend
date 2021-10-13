import { useState, useEffect } from "react";
import Image from "next/image";
import ReactMapGl, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Geocode from "react-geocode";

const EventMap = ({ evt }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 22.5726,
    longitude: 88.3639,
    width: "100%",
    height: "500px",
    zoom: 13,
  });

  //   Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

  //   useEffect(() => {
  //     // Get latitude & longitude from address.
  //     Geocode.fromAddress(evt.address).then(
  //       (response) => {
  //         const { lat, lng } = response.results[0].geometry.location;
  //         setLat(lat);
  //         setLng(lng);
  //         setViewport({ ...viewport, latitude: lat, longitude: lng });
  //         setLoading(false);
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  //   if (loading) return false;

  return (
    <ReactMapGl
      {...viewport}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      onViewportChange={(vp) => setViewport(vp)}
    >
      <Marker key={evt.id} latitude={22.5726} longitude={88.3639}>
        <Image src="/images/pin.svg" width={30} height={30} alt="pin" />
      </Marker>
    </ReactMapGl>
  );
};

export default EventMap;
