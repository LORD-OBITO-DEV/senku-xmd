// cred.js
const GITHUB_URL = "https://raw.githubusercontent.com/<your-username>/<your-repo>/main/creds.json";

let credsCache = null;

export async function getCreds() {

  if (credsCache) return credsCache; // use cache if already fetched

  try {

    const res = await fetch(GITHUB_URL);

    if (!res.ok) throw new Error("Failed to fetch creds from GitHub");
    
    const data = await res.json();

    credsCache = data; // save to cache

    return data;

  } catch (err) {

    console.error("Error fetching creds:", err.message);

    return null;
    
  }
}
