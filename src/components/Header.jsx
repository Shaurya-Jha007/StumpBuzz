import { useQuery } from "@tanstack/react-query";
import { fetchCurrentMatches } from "../util/fetch";
import loader from "../../public/loader.svg";

export default function Header() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["currentMatches"],
    queryFn: fetchCurrentMatches,
  });

  console.log(data);

  if (isPending) {
    return (
      <p className="flex items-center justify-center">
        <img src={loader} alt="Spinning loader" />
      </p>
    );
  }

  if (data) {
    return (
      <header className="h-92 bg-[#1D1E1F]">
        <div className="w-4/5 mx-auto h-3/4 flex justify-between items-end gap-3">
          {data.map((mat, index) => {
            return (
              <div key={index}>
                <div className="bg-[#2B2C2D] h-4/5 w-1/4 rounded-lg">
                  <ul className="flex justify-around mt-2.5 w-3/4">
                    <li className="font-bold text-[#CBCCCE]">Result</li>
                    <li className="font-bold text-[#CBCCCE]">
                      <span className="mr-1">&bull;</span>
                      19th Match
                    </li>
                    <li className="font-bold text-[#CBCCCE]">
                      <span className="mr-1">&bull;</span>
                      IPL
                    </li>
                    <li className="font-bold text-[#CBCCCE]">
                      <span className="mr-1">&bull;</span>
                      {}
                    </li>
                    <li className="font-normal">
                      <span className="mr-1">&bull;</span>
                      Hyderabad
                    </li>
                  </ul>
                </div>
                <div className="bg-[#2B2C2D] h-4/5 w-1/4 rounded-lg"></div>
                <div className="bg-[#2B2C2D] h-4/5 w-1/4 rounded-lg"></div>
                <div className="bg-[#2B2C2D] h-4/5 w-1/4 rounded-lg"></div>
              </div>
            );
          })}
        </div>
      </header>
    );
  }

  if (isError) {
    return (
      <div className="h-92 bg-[#1D1E1F] flex justify-center items-center text-red-500">
        <p className="text-6xl">
          {error.info?.message ||
            "Failed to fetch current matches! Please try again later."}
        </p>
      </div>
    );
  }
}
