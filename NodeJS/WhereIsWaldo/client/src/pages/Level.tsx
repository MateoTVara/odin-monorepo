import { useParams } from "react-router"
import type { LevelDetail as LevelType } from "../features/levels/levels.types";
import levelsApi from "../features/levels/levels.api";
import useAsync from "../hooks/useAsync";
import usePlayerName from "../hooks/usePlayerName";
import NamePrompt from "../components/NamePromp";
import { useEffect, useState } from "react";
import runsApi from "../features/runs/runs.api";
import CharactersSelector from "../components/CharactersSelector";
import type { Character } from "../features/characters/characters.types";
import type { CreateRunResponse } from "../features/runs/runs.types";

export default function Level() {
  let params = useParams<{ id: string }>();
  const { data: level, loading, error } = useAsync<LevelType>(
    () => levelsApi.getLevel(Number(params.id)), [params.id]
  );
  const { playerName, saveName, hasName } = usePlayerName();
  const [clickPosition, setClickPosition] = useState<{ x: number, y: number } | null>(null);
  const [visibleSelector, setVisibleSelector] = useState(false);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    console.log("Click coordinates:", clickPosition);
    setClickPosition(clickPosition);
    setVisibleSelector(true);
  };
  const [run, setRun] = useState<CreateRunResponse | null>(null);

  // Simulate characters with found status for demonstration
  const [characters, setCharacters] = useState<(Character & { found: boolean })[]>([]);

  useEffect(() => {
    if (!playerName || !level) return;

    const startRun = async () => {
      const run = await runsApi.create({
        name: playerName,
        levelId: level.id,
      });
      console.log("Run created:", run);
      setRun(run);
    };
    startRun();

    // Initialize characters with found status
    setCharacters(level.characters.map(c => ({ ...c, found: false })));
  }, [playerName, level]);

  if (loading) return <p>Loading level...</p>;

  if (error) {
    console.error("Error loading level:", error);
    return <p>Error loading level.</p>;
  }

  if (!level) return <p>Level not found.</p>;

  if (!run) return <p>Starting run...</p>;

  return (
    <div className="container flex flex-col items-center mx-auto">
      <div className="flex gap-4 my-6">
        {/* {level.characters.map((character) => ( */}
        {characters.map((character) => ( // to simulate found characters
          <div key={character.id} className="overflow-hidden relative">
            <img
              src={character.imgUrl}
              alt={character.name}
              className="w-18 h-18 object-contain"
            />
            {character.found && (
              <div className="absolute inset-0 bg-green-500 bg-opacity-50 flex items-center justify-center">
                <p className="text-white font-bold">Found!</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="w-full overflow-x-auto no-scrollbar mb-4">
        <div className="flex justify-center min-w-max relative">
          <img
            src={level.imgUrl}
            alt={level.name}
            onClick={handleImageClick}
            className="min-h-[70vh] max-w-none shrink-0"
          />
          
          <CharactersSelector
            // characters={level.characters}
            characters={characters} // to simulate found characters
            position={clickPosition}
            visible={visibleSelector}
            setVisible={setVisibleSelector}
            setCharacters={setCharacters}
            runId={run.id}
          />
        </div>
      </div>

      {!hasName && <NamePrompt saveName={saveName} />}
    </div>
  )
}