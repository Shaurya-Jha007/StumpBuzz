import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMatch } from "../util/fetch";
import loader from "../../public/loader.svg";
export default function DetailsPage() {
  const params = useParams();
  const matchId = params.matchId;
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["matchDetails"],
    queryFn: () => fetchMatch(matchId),
  });

  if (isPending) {
    return (
      <p className="flex justify-center items-center h-screen">
        <img src={loader} alt="Loading spinner" />
      </p>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600">
          {error.info?.message ||
            "Failed to fetch match data! Please try again later."}
        </p>
      </div>
    );
  }

  if (data) {
    console.log(data);
    return (
      <section>
        <h2>{`${data.name} - Live Cricket Score, Commentary`}</h2>
        <p>Venue : {data.venue}</p>
      </section>
    );
  }
}
