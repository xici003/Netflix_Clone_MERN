import axios from "axios";
import ReactPlayer from "react-player";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useContentStore } from "../store/content";
import { formatReleaseDate } from "../utils/dateFunction";
import NavBar from "../components/NavBar";
import {
  ORIGINAL_IMAGE_BASE_URL,
  SMALL_IMAGE_BASE_URL,
} from "../utils/constants";
import Spinner from "../components/Spinner";
import WatchPageSkeleton from "../components/WatchPageSkeleton";

function WatchPage() {
  const { id } = useParams();
  const [trailer, setTrailer] = useState([]);
  const [currentMovies, setCurrentMovies] = useState(0);
  const [content, setContent] = useState({});
  const [similarContent, setSimilarContent] = useState([]);
  const { contentType } = useContentStore();
  const [loading, setLoading] = useState(true);

  const sliderRef = useRef();

  //Get Trailers
  useEffect(() => {
    const getTrailer = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
        setTrailer(res.data.trailers);
        setLoading(true);
      } catch (err) {
        if (err.message.include("404")) {
          setTrailer([]);
        }
      }
    };
    getTrailer();
  }, [contentType, id]);

  //Get Similar Content
  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
        setSimilarContent(res.data.content);
      } catch (err) {
        if (err.message.include("404")) {
          setSimilarContent([]);
        }
      }
    };
    getSimilarContent();
  }, [contentType, id]);

  //Get Content (Movies, Tv shows)
  useEffect(() => {
    const getContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        setContent(res.data.details);
      } catch (error) {
        if (error.message.includes("404")) {
          setContent(null);
        }
      } finally {
        setLoading(false);
      }
    };
    getContent();
  }, [contentType, id]);

  const handlePrev = () => {
    //setTrailer((prev) => prev - 1);
    if (currentMovies > 0) setCurrentMovies((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentMovies < trailer.length - 1)
      setCurrentMovies((prev) => prev + 1);
  };

  const scrollLeft = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };
  const scrollRight = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };

  if (loading)
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );

  if (!content) {
    return (
      <div className="bg-black text-white h-screen">
        <div className="max-w-6xl mx-auto">
          <NavBar />
          <div className="text-center mx-auto px-4 py-8 h-full mt-40">
            <h2 className="text-2xl sm:text-5xl font-bold text-balance">
              Content not found 😥
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <NavBar />
      <div className=" mx-auto container h-full px-8 py-4">
        {trailer.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <button
              className={`bg-gray-500/70 rounded-full hover:bg-gray-500 p-3 ${
                currentMovies === 0 ? "cursor-not-allowed opacity-50" : ""
              } `}
              disabled={currentMovies === 0}
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className={`bg-gray-500/70 rounded-full hover:bg-gray-500 p-3 ${
                currentMovies === trailer.length - 1
                  ? "cursor-not-allowed opacity-50"
                  : ""
              } `}
              disabled={currentMovies === trailer.length - 1}
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
          {trailer.length > 0 ? (
            <ReactPlayer
              controls={true}
              width={"100%"}
              height={"100%"}
              className="rounded-lg overflow-hidden mx-auto"
              url={`https://www.youtube.com/watch?v=${trailer[currentMovies].key}`}
            />
          ) : (
            <h2 className="text-xl text-center mt-5">
              No trailers available for{" "}
              <span className="font-bold text-red-600">
                {content?.title || content?.name}
              </span>{" "}
              😥
            </h2>
          )}
        </div>

        {/* movie details */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-20 
				max-w-6xl mx-auto"
        >
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold text-balance">
              {content?.title || content?.name}
            </h2>

            <p className="mt-2 text-lg">
              {formatReleaseDate(
                content?.release_date || content?.first_air_date
              )}{" "}
              |{" "}
              {content?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}{" "}
            </p>
            <p className="mt-4 text-lg">{content?.overview}</p>
          </div>
          <img
            src={ORIGINAL_IMAGE_BASE_URL + content?.poster_path}
            alt="Poster image"
            className="max-h-[500px] rounded-md"
          />
        </div>

        {similarContent.length > 0 && (
          <div className="mt-12 max-w-5xl mx-auto relative">
            <h3 className="text-3xl font-bold mb-4">Similar Movies/Tv Show</h3>

            <div
              className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group"
              ref={sliderRef}
            >
              {similarContent.map((content) => {
                if (content.poster_path === null) return null;
                return (
                  <Link
                    key={content.id}
                    to={`/watch/${content.id}`}
                    className="w-52 flex-none"
                  >
                    <img
                      src={SMALL_IMAGE_BASE_URL + content.poster_path}
                      alt="Poster path"
                      className="w-full h-auto rounded-md"
                    />
                    <h4 className="mt-2 text-lg font-semibold">
                      {content.title || content.name}
                    </h4>
                  </Link>
                );
              })}

              <ChevronRight
                size={24}
                className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8
										opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
										 bg-red-600/80 text-white rounded-full"
                onClick={scrollRight}
              />
              <ChevronLeft
                size={24}
                className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 
								group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600/80
								text-white rounded-full"
                onClick={scrollLeft}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WatchPage;
