import { useParams } from "react-router-dom";
export default function DetailsPage() {
  const params = useParams();
  return <h1>This is the details page{params.matchId}.</h1>;
}
