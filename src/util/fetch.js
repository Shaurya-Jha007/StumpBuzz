import { key } from "../../key";
export async function fetchCurrentMatches() {
  const response = await fetch(
    `https://api.cricapi.com/v1/currentMatches?apikey=${key}&offset=0`
  );
  if (!response.ok) {
    const error = new Error("An error occured while fetching matches.");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const data = await response.json();
  return data.data;
}
