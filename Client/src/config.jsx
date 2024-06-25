export default function getApiDomain() {
  // Access the environment variable directly using import.meta.env
  return import.meta.env.VITE_REACT_APP_API_DOMAIN;
}
