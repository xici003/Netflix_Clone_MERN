import Footer from "../../components/Footer";
import { useAuthStore } from "../../store/authUser";

function HomeScreen() {
  const { logout } = useAuthStore();
  return (
    <div>
      <div className="relative h-screen text-white"></div>
      <Footer />
    </div>
  );
}

export default HomeScreen;
