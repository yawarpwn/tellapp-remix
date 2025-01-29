// export const BASE_URL = "http://localhost:8787";
const isDev = import.meta.env.MODE === "development";
export const BASE_URL = isDev
  ? "http://localhost:8787"
  : "https://api.tellsignals.workers.dev";
