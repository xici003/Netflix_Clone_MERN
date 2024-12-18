import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useContentStore } from "../store/content";
import { Search } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ORIGINAL_IMAGE_BASE_URL } from "../utils/constants";

function SearchPage() {
  const [activeTab, setActiveTab] = useState("movies");
  const [searchItem, setSearchItem] = useState("");
  const [results, setResults] = useState([]);
  const { setContentType } = useContentStore();

  const handleClick = (tab) => {
    setActiveTab(tab);
    tab === "movies" ? setContentType("movies") : setContentType("tv");
    setResults([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchItem}`);
      setResults(res.data.content);
    } catch (err) {
      if (err.response.status === 404) {
        toast.error(
          "Nothing found, make sure you are searching under the right category"
        );
      } else {
        toast.error("An error occurred. Please try again");
      }
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center gap-6 mb-4">
          <button
            className={`px-4 py-3 rounded-lg ${
              activeTab === "movies" ? "bg-red-700" : "bg-gray-700"
            }`}
            onClick={() => handleClick("movies")}
          >
            Movies
          </button>
          <button
            className={`px-4 py-3 rounded-lg ${
              activeTab === "tv" ? "bg-red-700" : "bg-gray-700"
            }`}
            onClick={() => handleClick("tv")}
          >
            Tv Shows
          </button>

          <button
            className={`px-4 py-3 rounded-lg ${
              activeTab === "person" ? "bg-red-700" : "bg-gray-700"
            }`}
            onClick={() => setActiveTab("person")}
          >
            People
          </button>
        </div>

        <form
          className="flex items-stretch max-w-2xl mx-auto gap-2 mb-8"
          onSubmit={handleSearch}
        >
          <input
            className="px-4 py-3 w-full bg-slate-700/70 rounded-lg"
            placeholder={`Search for a ${activeTab}`}
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
          />
          <button className="bg-red-700 p-3 rounded-lg ml-2">
            <Search className="size-6" />
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((result) => {
            if (!result.poster_path && !result.profile_path) return null;

            return (
              <div key={result.id} className="bg-gray-800 p-4 rounded">
                {activeTab === "person" ? (
                  <Link
                    to={"/actor/" + result.name}
                    className="flex flex-col items-center"
                  >
                    <img
                      src={ORIGINAL_IMAGE_BASE_URL + result.profile_path}
                      alt={result.name}
                      className="max-h-90 rounded mx-auto"
                    />
                    <h2 className="mt-2 text-xl font-bold">{result.name}</h2>
                  </Link>
                ) : (
                  <Link to={"/watch/" + result.id}>
                    <img
                      src={ORIGINAL_IMAGE_BASE_URL + result.poster_path}
                      alt={result.title || result.name}
                      className="w-full rounded mx-auto"
                    />
                    <h2 className="mt-2 text-xl font-bold">
                      {result.title || result.name}
                    </h2>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
