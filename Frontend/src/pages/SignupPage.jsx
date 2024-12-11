import { Link } from "react-router-dom";
import InputItems from "../components/InputItems";
import { useState } from "react";
import Header from "../components/Header";
import { useAuthStore } from "../store/authUser";

function SignupPage() {
  const { searchParams } = new URL(document.location);
  const emailValue = searchParams.get("email");

  const [email, setEmail] = useState(emailValue || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ email, password, username });
  };

  return (
    <div className="hero-bg h-screen w-ful">
      <Header />

      <div className="flex justify-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/70 rounded-lg shadow-lg">
          <h1 className="text-white text-3xl font-bold mb-4">Sign Up</h1>

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
              htmlFor="username"
              type="text"
              content="Username"
              placeholder="username"
              value={username}
              setValue={setUsername}
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
              disabled={isSigningUp}
            >
              {isSigningUp ? "Loading..." : "Sign Up"}
            </button>
          </form>

          <div className="text-center text-gray-400">
            Already a member ?{" "}
            <Link
              to="/login"
              className="text-red-700 font-bold hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
