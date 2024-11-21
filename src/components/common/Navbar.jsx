import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import useAuth from "../../hooks/useAuth";
const Navbar = () => {
  const { auth } = useAuth();
  const user = auth?.user?.email;

  return (
    <header className="flex justify-between items-center mb-12">
      <Link to={'/'}>
      <img src={logo} className="h-7" />
      </Link>
      
      <div>
        {!user ? (
          <Link
            to={`/login`}
            className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
            style={{ fontFamily: "Jaro" }}
          >
            Login
          </Link>
        ) : (
          <button
            className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
            style={{ fontFamily: "Jaro" }}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
