import { useParams } from "react-router"
import type { LevelDetail as LevelType } from "../features/levels/levels.types";
import levelsApi from "../features/levels/levels.api";
import useAsync from "../hooks/useAsync";

export default function Level() {
  let params = useParams<{ id: string }>();
  const { data: level, loading, error } = useAsync<LevelType>(
    () => levelsApi.getLevel(Number(params.id)),
    [params.id]
  );

  if (loading) return <p>Loading level...</p>;

  if (error) {
    console.error("Error loading level:", error);
    return <p>Error loading level.</p>;
  }

  if (!level) return <p>Level not found.</p>;

  return (
    <div className="container flex flex-col items-center mx-auto p-4 overflow-x-hidden">
      <div className="flex gap-4 mb-6">
        {level.characters.map((character) => (
          <div key={character.character.id} className="overflow-hidden">
            <img
              src={character.character.img_url}
              alt={character.character.name}
              className="w-18 h-18 object-contain"
            />
          </div>
        ))}
      </div>

      <div className="w-full overflow-x-auto no-scrollbar mb-4">
        <div className="w-full overflow-x-auto no-scrollbar mb-4 flex justify-center">
          <img
            src={level.img_url}
            alt={level.name}
            className="min-h-[70vh] max-w-none"
          />
        </div>
      </div>
    </div>
  )
}