import { useParams } from "react-router"
import type { LevelDetail as LevelType } from "../features/levels/levels.types";
import levelsApi from "../features/levels/levels.api";
import useAsync from "../hooks/useAsync";
import usePlayerName from "../hooks/usePlayerName";
import NamePrompt from "../components/NamePromp";
import { useEffect } from "react";
import runsApi from "../features/runs/runs.api";

export default function Level() {
  let params = useParams<{ id: string }>();
  const { data: level, loading, error } = useAsync<LevelType>(
    () => levelsApi.getLevel(Number(params.id)), [params.id]
  );
  const { playerName, saveName, hasName } = usePlayerName();

  useEffect(() => {
    if (!playerName || !level) return;

    runsApi.create({
      name: playerName,
      levelId: level.id
    });
  }, [playerName, level]);

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
          <div key={character.id} className="overflow-hidden">
            <img
              src={character.imgUrl}
              alt={character.name}
              className="w-18 h-18 object-contain"
            />
          </div>
        ))}
      </div>

      <div className="w-full overflow-x-auto no-scrollbar mb-4">
        <div className="w-full overflow-x-auto no-scrollbar mb-4 flex justify-center">
          <img
            src={level.imgUrl}
            alt={level.name}
            className="min-h-[70vh] max-w-none"
          />
        </div>
      </div>

      {!hasName && <NamePrompt saveName={saveName} />}
    </div>
  )
}