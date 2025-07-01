import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { auth } from "./firebase";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

const cameras = [
  {
    id: 1,
    name: "Times Square - NYC",
    lat: 40.758,
    lng: -73.985,
    streamUrl: "https://video.nest.com/embedded/live/example1"
  },
  {
    id: 2,
    name: "Eiffel Tower - Paris",
    lat: 48.8584,
    lng: 2.2945,
    streamUrl: "https://video.nest.com/embedded/live/example2"
  },
  {
    id: 3,
    name: "Tokyo Tower - Japan",
    lat: 35.6586,
    lng: 139.7454,
    streamUrl: "https://video.nest.com/embedded/live/example3"
  }
];

export default function DevilsEye() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Devil's Eye 🔒</h1>
          <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">Login with Google</button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen">
      <div className="absolute top-2 right-2 z-50">
        <span className="mr-4 text-white">Welcome, {user.displayName}</span>
        <button onClick={handleLogout} className="bg-gray-700 px-3 py-1">Logout</button>
      </div>
      <MapContainer center={[20, 0]} zoom={2} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {cameras.map((cam) => (
          <Marker key={cam.id} position={[cam.lat, cam.lng]}>
            <Popup>
              <strong>{cam.name}</strong>
              <br />
              <iframe
                src={cam.streamUrl}
                width="250"
                height="150"
                allow="autoplay"
                frameBorder="0"
                title={cam.name}
              ></iframe>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}