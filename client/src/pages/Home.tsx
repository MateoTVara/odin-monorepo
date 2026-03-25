import type { Level } from "../features/levels/levels.types";
import { Link } from "react-router";
import levelsApi from "../features/levels/levels.api";
import useAsync from "../hooks/useAsync";

export default function Home() {
  const { data: levels, loading, error } = useAsync<Level[]>(levelsApi.getLevels)

  if (loading) return <p>Loading levels...</p>;

  if (error) {
    console.error("Error loading levels:", error);
    return <p>Error loading levels.</p>;
  }

  if (!levels || levels.length === 0) return <p>No levels found.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Where's Waldo?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {levels.map((level) => (
            <Link
              key={level.id}
              to={`/levels/${level.id}`}
              className="border rounded-lg overflow-hidden shadow-lg"
            >
              <img src={level.img_url} alt={level.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{level.name}</h2>
              </div>
            </Link>
          ))}
        </div>
    </div>
  );
}