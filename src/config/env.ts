const apiBaseUrl = import.meta.env.VITE_BASE_URL;

if (!apiBaseUrl) {
  throw new Error('Missing VITE_BASE_URL environment variable');
}

export const env = { apiBaseUrl };
