import { divIcon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

function createMarker(color, label) {
  return divIcon({
    className: "",
    html: `
      <div style="
        width: 34px;
        height: 34px;
        border-radius: 999px;
        display: grid;
        place-items: center;
        color: white;
        font-weight: 800;
        font-size: 12px;
        background: ${color};
        border: 4px solid white;
        box-shadow: 0 10px 25px rgba(16,32,39,0.22);
      ">${label}</div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17]
  });
}

const userIcon = createMarker("#e23d57", "You");
const safeZoneIcon = createMarker("#0f9f8a", "SZ");
const alertIcon = createMarker("#f97316", "SOS");

function safeZoneCoordinates(index) {
  const base = [
    [12.9412, 77.6227],
    [12.9288, 77.6289],
    [12.9341, 77.6112],
    [12.9454, 77.6376]
  ];

  return base[index % base.length];
}

export default function SafetyMap({ center, safeZones = [], alerts = [], className = "" }) {
  const resolvedCenter = [center.lat, center.lng];

  return (
    <div className={className}>
      <MapContainer center={resolvedCenter} zoom={14} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={resolvedCenter} icon={userIcon}>
          <Popup>Your current live location</Popup>
        </Marker>

        {safeZones.map((zone, index) => (
          <Marker key={zone.id} position={safeZoneCoordinates(index)} icon={safeZoneIcon}>
            <Popup>
              <strong>{zone.name}</strong>
              <br />
              {zone.address}
            </Popup>
          </Marker>
        ))}

        {alerts
          .filter((alert) => alert.coordinates?.lat && alert.coordinates?.lng)
          .slice(0, 4)
          .map((alert) => (
            <Marker key={alert.id} position={[alert.coordinates.lat, alert.coordinates.lng]} icon={alertIcon}>
              <Popup>
                <strong>{alert.severity} alert</strong>
                <br />
                {alert.location}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
