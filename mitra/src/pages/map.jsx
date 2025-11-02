import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// NOTE: Leaflet's default marker icons need a tiny workaround when bundlers fail to load images.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

// Replace this with your actual ipstack API key
const IPSTACK_KEY = 'a9fcfd46b1e729113beefde693ae6f65';

function Recenter({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 13, { animate: true });
    }
  }, [lat, lng, map]);
  return null;
}

export default function IpstackLeafletMap() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ipInfo, setIpInfo] = useState(null);

  useEffect(() => {
    async function fetchIpLocation() {
      setLoading(true);
      setError(null);
      try {
        // ipstack endpoint for the caller's IP (use https if your plan supports it)
        const resp = await fetch(`http://api.ipstack.com/check?access_key=${IPSTACK_KEY}`);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data = await resp.json();
        // Basic validation
        if (!data || typeof data.latitude !== 'number' || typeof data.longitude !== 'number') {
          throw new Error('Invalid response from IPStack');
        }
        setIpInfo(data);
      } catch (err) {
        console.error('Failed to fetch IP location', err);
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchIpLocation();
    // If you want periodic refresh (note: IPs rarely change) you can enable polling:
    // const id = setInterval(fetchIpLocation, 60_000); // every 60s
    // return () => clearInterval(id);
  }, []);

  return (
    <div className="p-4 h-[70vh] w-full">
      <div className="h-full rounded-lg overflow-hidden border">
        {loading && (
          <div className="flex items-center justify-center h-full">Loading location…</div>
        )}

        {error && (
          <div className="p-4 text-red-600">Error fetching IP location: {error}</div>
        )}

        {!loading && !error && ipInfo && (
          <MapContainer
            center={[ipInfo.latitude, ipInfo.longitude]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[ipInfo.latitude, ipInfo.longitude]}>
              <Popup>
                <div style={{ minWidth: 200 }}>
                  <strong>IP:</strong> {ipInfo.ip}<br />
                  <strong>City:</strong> {ipInfo.city || '—'}<br />
                  <strong>Region:</strong> {ipInfo.region_name || '—'}<br />
                  <strong>Country:</strong> {ipInfo.country_name || '—'}<br />
                  <strong>Lat,Lng:</strong> {ipInfo.latitude}, {ipInfo.longitude}
                </div>
              </Popup>
            </Marker>

            <Recenter lat={ipInfo.latitude} lng={ipInfo.longitude} />
          </MapContainer>
        )}
      </div>
    </div>
  );
}
