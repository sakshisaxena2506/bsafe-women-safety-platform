export function getCurrentPosition() {
  if (!("geolocation" in navigator)) {
    return Promise.reject(new Error("Geolocation is not supported by this browser."));
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: Number(position.coords.latitude.toFixed(6)),
          longitude: Number(position.coords.longitude.toFixed(6)),
          accuracy: Math.round(position.coords.accuracy),
          timestamp: new Date(position.timestamp).toISOString()
        });
      },
      () => {
        reject(new Error("Location permission is required to send an SOS alert."));
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 15000
      }
    );
  });
}
