import { useQuery } from "@tanstack/react-query";
import { fetchCurrentMatches } from "../util/fetch";
import loader from "../../public/loader.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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
    slidesToScroll: 2,
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
                <div
                  className="bg-[#2B2C2D] h-60 mt-12 rounded-2xl ml-2"
                  key={index}
                >
                  <ul className="flex justify-around mt-2.5 w-3/4">
                    <li className="font-bold text-[#CBCCCE]">Result</li>
                    <li className="font-bold text-[#CBCCCE]">
                      <span className="mr-1">&bull;</span>
                      {index}
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
