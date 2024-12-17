import { Info, Play } from "lucide-react";
import NavBar from "../../components/NavBar";
import { Link } from "react-router-dom";
import useGetTrendingContent from "../../hooks/useGetTrendingContent.jsx";
import {
  MOVIES_CATEGORIES,
  ORIGINAL_IMAGE_BASE_URL,
  TV_CATEGORIES,
} from "../../utils/constants.js";
import Spinner from "../../components/Spinner";
import { useContentStore } from "../../store/content";
import MoviesSlider from "../../components/MoviesSlider";
import { useState } from "react";

function HomeScreen() {
  const { trendingContent } = useGetTrendingContent();
  const { contentType } = useContentStore();
  const [imgLoading, setImgLoading] = useState(true);

  if (!trendingContent) return <Spinner />;

  return (
    <div>
      <div className="relative h-screen text-white">
        <NavBar />

        {/* COOL OPTIMIZATION HACK FOR IMAGES */}
        {imgLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10" />
        )}

        <img
          src={ORIGINAL_IMAGE_BASE_URL + trendingContent?.backdrop_path}
          alt="banner-home"
          className="absolute top-0 left-0 h-full w-full object-cover -z-50"
          onLoad={() => {
            setImgLoading(false);
          }}
        />
        <div className="absolute top-0 left-0 bg-black/40 h-full w-full -z-50"></div>

        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
          <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute top-0 left-0 w-full h-full -z-10"></div>

          <div className="max-w-2xl ">
            <h1 className="text-6xl font-extrabold mt-4 text-balance">
              {trendingContent?.title || trendingContent?.name}
            </h1>
            <p className="text-lg mt-2">
              {trendingContent?.release_date?.split("-")[0] ||
                trendingContent?.first_air_date.split("-")[0]}{" "}
              | {trendingContent?.adult ? "18+" : "PG-13"}
            </p>
            <p className="text-lg mt-4">
              {trendingContent?.overview.length > 200
                ? trendingContent?.overview.slice(0, 200) + "..."
                : trendingContent?.overview}
            </p>
          </div>

          <div className="flex mt-8">
            <Link
              to={`/watch/${trendingContent?.id}`}
              className="bg-white hover:bg-white/80 px-4 py-2 border rounded text-black font-bold flex items-center mr-4"
            >
              <Play className="size-6 mr-2 fill-black" />
              Play
            </Link>

            <Link
              to={`/watch/${trendingContent?.id}`}
              className="bg-gray-500/70 hover:bg-gray-500 px-4 py-2 rounded text-white flex items-center"
            >
              <Info className="size-6 mr-2" />
              More Info
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-col bg-black gap-10 py-10">
        {contentType === "movies"
          ? MOVIES_CATEGORIES.map((category, index) => (
              <MoviesSlider key={index} category={category} />
            ))
          : TV_CATEGORIES.map((category, index) => (
              <MoviesSlider key={index} category={category} />
            ))}
      </div>
    </div>
  );
}

export default HomeScreen;
