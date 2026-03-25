import { Link } from "react-router";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">Where's Waldo?</h1>
        <nav>
          <Link to="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
        </nav>
      </div>
    </header>
  )
}