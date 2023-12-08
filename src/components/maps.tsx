"use client";

import {
  GoogleMap,
  useJsApiLoader,
  Marker,
} from "@react-google-maps/api";

const Maps = ({aspectHeight, aspectWidth, lat, long}:{aspectHeight:number; aspectWidth:number; lat: number; long: number;}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCIhUtglT6YFezdl6bj0-ttZhcYiHrC90c",
    // libraries: ['routes']
  });


//   const calculateRoute = async () => {
//     // if (originLatLng.lat === 0 && originLatLng.lng === 0 || destinationLatLng.lat === 0 && destinationLatLng.lng === 0) {
//     //   return
//     // }
//     // eslint-disable-next-line no-undef
//     const directionsService = new google.maps.DirectionsService();

//     // Define waypoints as an array of LatLng objects
//     const waypoints: google.maps.DirectionsWaypoint[] = [
//       { location: { lat: -6.917780, lng: 107.614910 } },
//       { location: { lat: -6.874230, lng: 107.616400 } },
//       { location: { lat: -6.891480, lng: 107.610657 } },
//       { location: { lat: -6.891483, lng: 107.610659 } },
//       // Add more waypoints as needed
//     ];


//     const results = await directionsService.route({
//       origin: { lat: -6.902481, lng: 107.618813 },
//       waypoints: waypoints,
//       destination: { lat: -6.902481, lng: 107.618813 },
//       travelMode: google.maps.TravelMode.DRIVING,
//       optimizeWaypoints: true
//     }) as google.maps.DirectionsResult;
//     if (results.routes && results.routes.length > 0 && results.routes[0].legs && results.routes[0].legs.length > 0) {
//       setDirectionResponse(results);
//       setDistance(results.routes[results.routes.length].legs[0].distance?.text || '');
//       setDuration(results.routes[results.routes.length].legs[0].duration?.text || '');
//     } else {
//       // Handle the case when necessary properties are undefined
//       console.error("Invalid route data received:", results);
//     }
//   }

//   useEffect(() => {
//     console.log(directionResponse)
//     console.log(distance)
//     console.log(duration)
//   }, [directionResponse])

  return (
    <div>
      {isLoaded && aspectHeight!=0 && aspectWidth!=0 ? (
        <div className={`w-full h-full rounded-[10px]`} style={{ aspectRatio: `${aspectWidth} / ${aspectHeight}` }}>
          <GoogleMap
            zoom={17}
            center={{ lat: lat, lng: long }}
            mapContainerStyle={{width: "100%", height: "100%"}}
            options={{
                mapTypeControl: false
            }}
          >
            <Marker position={{ lat: lat, lng: long }}/>
          </GoogleMap>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Maps