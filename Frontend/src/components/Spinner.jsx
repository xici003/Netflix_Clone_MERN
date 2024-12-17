import { Loader } from "lucide-react";
import NavBar from "./NavBar";

function Spinner() {
  return (
    <div className="h-screen text-white relative">
      <NavBar />
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black -z-10">
        <Loader className="animate-spin text-red-600 size-10" />
      </div>
    </div>
  );
}

export default Spinner;
