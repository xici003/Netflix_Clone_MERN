import { LogOut, Menu, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";

function NavBar() {
  const { logout, user } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const { setContentType } = useContentStore();

  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
      <div className="flex items-center gap-10 z-50">
        <Link to="/">
          <img
            src="../netflix-logo.png"
            alt="netflix_logo"
            className="w-20 sm:w-32"
          />
        </Link>
        {/* Desktop navbar item */}
        <div className="hidden sm:flex gap-4 items-center">
          <Link to="/" className="hover:text-[#575757]">
            Home
          </Link>
          <Link
            to="/"
            className="hover:text-[#575757]"
            onClick={() => setContentType("movies")}
          >
            Movies
          </Link>

          <Link
            to="/"
            className="hover:text-[#575757]"
            onClick={() => setContentType("tv")}
          >
            TV Shows
          </Link>
          <Link
            to="/history"
            className="hover:text-[#575757]"
            onClick={() => setContentType("history")}
          >
            Search History
          </Link>
        </div>
      </div>

      <div className="flex gap-4 items-center z-50">
        <Link to="/search">
          <Search className="size-6 cursor-pointer" />
        </Link>
        <img
          src={user.photo}
          alt="Avatar"
          className="h-8 rounded cursor-pointer"
        />
        <LogOut className="size-6 cursor-pointer" onClick={logout} />
        <div className="sm:hidden">
          <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu} />
        </div>
      </div>

      {/* Mobile navbar item */}
      {isMobileMenuOpen && (
        <div className="w-full flex flex-col gap-4 sm:hidden mt-4 z-50 bg-black border rounded border-gray-800 ">
          <Link
            to="/"
            className="hover:text-[#575757]"
            onClick={toggleMobileMenu}
          >
            Home
          </Link>
          <Link
            to="/"
            className="hover:text-[#575757]"
            onClick={toggleMobileMenu}
          >
            TV Shows
          </Link>
          <Link
            to="/movies"
            className="hover:text-[#575757]"
            onClick={toggleMobileMenu}
          >
            Movies
          </Link>
          <Link
            to="/search"
            className="hover:text-[#575757]"
            onClick={toggleMobileMenu}
          >
            Search History
          </Link>
        </div>
      )}
    </header>
  );
}

export default NavBar;
