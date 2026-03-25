import { useEffect, useState } from "react";
import type { Level } from "../types/Level";
import { Link } from "react-router";

export default function Home() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/levels");
        const data = await response.json();
        setLevels(data);
      } catch (error) {
        console.error("Error fetching levels:", error);        
      } finally {
        setLoading(false);
      }
    }
    fetchLevels();
  }, []);

  if (loading) {
    return <p>Loading levels...</p>;
  }

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