import { useQuery } from "@tanstack/react-query";
import { fetchCurrentMatches } from "../util/fetch";
import loader from "../../public/loader.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";

export default function Header() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["currentMatches"],
    queryFn: fetchCurrentMatches,
  });

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
  };

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
        <div className="w-4/5 mx-auto h-3/4">
          <Slider {...settings}>
            {data.map((mat, index) => {
              return (
                <Link
                  className="bg-[#2B2C2D] h-60 mt-12 rounded-2xl px-4"
                  key={index}
                  to={`/details/${mat.id}`}
                >
                  <ul className="flex justify-around mt-2.5 w-3/4">
                    <li
                      className={`font-bold ${
                        mat.matchEnded ? "text-[#CBCCCE]" : "text-red-500"
                      }`}
                    >
                      {mat.matchEnded
                        ? "Result"
                        : mat.matchStarted
                        ? "Live"
                        : "Upcoming"}
                    </li>
                    <li className="font-bold text-[#CBCCCE]">
                      <span className="mr-1">&bull;</span>
                      {mat.name.split(",")[1]}
                    </li>
                    <li className="font-bold text-[#CBCCCE]">
                      <span className="mr-1">&bull;</span>
                      {mat.matchType.toUpperCase()}
                    </li>

                    <li className="font-normal">
                      <span className="mr-1">&bull;</span>
                      {mat.venue.split(",")[1]}
                    </li>
                  </ul>
                  <div className="flex justify-between">
                    <div className="ml-4">
                      {mat.teams.map((team) => {
                        return (
                          <p className="mt-7 text-xl font-semibold">{team}</p>
                        );
                      })}
                    </div>
                    <div className="ml-4">
                      {mat.score.slice(0, 2).map((score) => {
                        return (
                          <p className="mt-7 text-xl font-semibold">{`${score.r}/${score.w} (${score.o})`}</p>
                        );
                      })}
                    </div>
                  </div>
                  <p className="w-14/15 mt-8 mx-auto text-xl font-semibold">
                    {mat.status}
                  </p>
                </Link>
              );
            })}
          </Slider>
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
