import { Link } from "react-router";

export default function Header() {
  return (
    <header className="p-7 border-b border-b-neutral-200 flex justify-center">
      <Link
        to="/"
        className="
        text-xl font-bold
        lg:text-3xl
        "
      >
        <h1>
          <span className="text-blue-500">Where's </span>
          <span className="text-red-500">Waldo? </span>
          <span>Play Online</span>
        </h1>
      </Link>
    </header>
  )
}