import { useState, useEffect } from "react";
import Image from "next/image";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const EventMap = ({ address }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 12,
  });

  useEffect(() => {
    async function getGeolocation() {
      // For documentation -> https://docs.geocodingapi.net/
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_GEOCODIANG_API_KEY,
          "X-RapidAPI-Host": "forward-reverse-geocoding.p.rapidapi.com",
        },
      };

      const res = await fetch(
        `https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q=${address}&accept-language=en`,
        options
      );
      const data = await res.json();
      const { lat, lon } = data[0];
      console.log(lat, lon);
      setLat(lat);
      setLng(lon);
      setViewState({ ...viewState, latitude: lat, longitude: lon });
      setLoading(false);
    }

    getGeolocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  if (loading) {
    return false;
  }

  return (
    <Map
      {...viewState}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      style={{ width: 800, height: 600 }}
    >
      <Marker latitude={lat} longitude={lng}>
        <Image src="/images/pin.svg" width={30} height={30} alt="marker" />
      </Marker>
    </Map>
  );
};
export default EventMap;
