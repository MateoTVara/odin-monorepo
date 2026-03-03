import { useAuth } from "../context/auth/useAuth";
import { Link } from "react-router";

const Header = () => {
  const {user, logout} = useAuth();

  return (
    <header
      className="flex flex-row items-center justify-between p-4 bg-gray-800 text-white"
    >
      <h1>
        <Link to="/">
          Admin Dashboard
        </Link>
      </h1>

      <div className="flex items-center space-x-4">
        <span>{user?.user.username}</span>
        {user ? (
            <button
              className="px-3 py-1 bg-red-500 rounded hover:bg-red-600"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <Link
              className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600" 
              to="/login"
            >
              Login
            </Link>
          )
        }
      </div>
    </header>
  )
}

export default Header;