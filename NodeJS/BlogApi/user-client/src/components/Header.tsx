import { useState, useEffect } from "react";
import { Link } from "react-router"
import { applyTheme } from "../utils/theme";
import { useAuth } from "../context/auth/useAuth";

const Header = () => {
  const { user, logout } = useAuth();

  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    if (localStorage.theme === 'light') return 'light';
    if (localStorage.theme === 'dark') return 'dark';
    return 'system';
  });

  useEffect(() => {
    applyTheme();
  }, [theme]);

  function cycleTheme() {
    if (theme === 'light') {
      localStorage.theme = 'dark';
      setTheme('dark');
    } else if (theme === 'dark') {
      localStorage.removeItem('theme');
      setTheme('system');
    } else {
      localStorage.theme = 'light';
      setTheme('light');
    }
  }

  const themeIcon = {
    light: '☀️',
    dark: '🌙',
    system: '💻'
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/auth';
  }

  return (
    <header className="
      flex justify-between items-center px-6 py-4 shadow-sm sticky top-0 z-50
      bg-white border-b border-gray-200
      dark:bg-gray-900 dark:border-gray-700 dark:text-white
    ">
      <Link to="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
        Blog API
      </Link>
      
      <div className="flex items-center gap-4">
        <p>
          {user ? user.user.username : 'Guest'}
        </p>
        <button 
          onClick={cycleTheme}
          className="
            flex items-center gap-2 px-3 py-1.5 rounded-lg
            text-sm font-medium
            bg-gray-100 hover:bg-gray-200
            dark:bg-gray-800 dark:hover:bg-gray-700
            transition-colors
          "
          title={`Current: ${theme}`}
        >
          <span>{themeIcon[theme]}</span>
          {/* <span className="capitalize">{theme}</span> */}
        </button>
        
        <nav className="flex items-center gap-1">
          <Link 
            to="/"
            className="
              px-3 py-1.5 rounded-lg text-sm font-medium
              hover:bg-gray-100 dark:hover:bg-gray-800
              transition-colors
            "
          >
            Home
          </Link>
          {user ? (
              <button
                onClick={handleLogout}
                className="
                  px-3 py-1.5 rounded-lg text-sm font-medium
                  bg-red-600 text-white hover:bg-red-700
                  transition-colors
                "
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/auth"
                className="
                  px-3 py-1.5 rounded-lg text-sm font-medium
                  bg-blue-600 text-white hover:bg-blue-700
                  transition-colors
                "
              >
                Login
              </Link>
            )
          }
        </nav>
      </div>
    </header>
  )
}

export default Header;