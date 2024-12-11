import { Link } from "react-router-dom";
import InputItems from "../components/InputItems";
import { useState } from "react";
import { useAuthStore } from "../store/authUser";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="hero-bg h-screen w-ful">
      <header className="max-w-6xl mx-auto flex justify-between pt-5">
        <Link to="/">
          <img src="./netflix-logo.png" alt="netflix_logo" className="w-40" />
        </Link>
      </header>
      <div className="flex justify-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/70 rounded-lg shadow-lg">
          <h1 className="text-white text-3xl font-bold mb-4">Log In</h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <InputItems
              htmlFor="email"
              type="email"
              content="Email"
              placeholder="you@example.com"
              value={email}
              setValue={setEmail}
            />
            <InputItems
              htmlFor="password"
              type="password"
              content="Password"
              placeholder="********"
              value={password}
              setValue={setPassword}
            />

            <button
              className="px-3 py-3 text-white font-bold text-lg w-full bg-red-700 rounded-sm"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Loading..." : "Login"}
            </button>
          </form>

          <div className="text-center text-gray-400">
            Don't have account? Please{" "}
            <Link
              to="/signup"
              className="text-red-700 font-bold hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
