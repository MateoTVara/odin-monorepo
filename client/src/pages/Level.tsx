import { useParams } from "react-router"
import type { LevelDetail as LevelType } from "../features/levels/levels.types";
import levelsApi from "../features/levels/levels.api";
import useAsync from "../hooks/useAsync";
import usePlayerName from "../hooks/usePlayerName";
import NamePrompt from "../components/NamePromp";
import { useEffect, useRef, useState } from "react";
import runsApi from "../features/runs/runs.api";
import CharactersSelector from "../components/CharactersSelector";
import type { LevelCharacter } from "../features/characters/characters.types";
import type { CreateRunResponse } from "../features/runs/runs.types";
import formatDuration from "../utils/formatDuration";
import { parseISO } from "date-fns";
import Leaderboard from "../components/Leaderboard";
import MagnifierCursor from "../components/MagnifierCursor";
import useMagnifier from "../hooks/useMagnifier";
import PageLoading from "../components/PageLoading";
import PageError from "../components/PageError";

export default function Level() {
  let params = useParams<{ id: string }>();
  const { data: levelData, loading: levelLoading, error: levelError } = useAsync<LevelType>(
    () => levelsApi.getLevel(Number(params.id)), [params.id]
  );
  const { playerName, saveName, hasName } = usePlayerName();
  const [clickPosition, setClickPosition] = useState<{ x: number, y: number } | null>(null);
  const [visibleSelector, setVisibleSelector] = useState(false);
  
  const [runData, setRunData] = useState<CreateRunResponse | null>(null);
  const [runLoading, setRunLoading] = useState(false);
  const [runError, setRunError] = useState<unknown>(null);
  const [characters, setCharacters] = useState<(LevelCharacter & {
    found: boolean 
    elapsedTime?: string
  })[]>([]);

  const [levelComplete, setLevelComplete] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null!);
  const {
    hoverPosition,
    handleImageMouseMove,
    handleImageMouseLeave,
    enabled: magnifierEnabled,
    toggleMagnifier,
    MAGNIFIER_SIZE,
    MAGNIFIER_ZOOM
  } = useMagnifier();

  const [foundAnimations, setFoundAnimations] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  const triggerFoundAnimation = (x: number, y: number) => {
    const id = Date.now();

    setFoundAnimations(prev => [...prev, { id, x, y }]);

    setTimeout(() => {
      setFoundAnimations(prev => prev.filter(a => a.id !== id));
    }, 700);
  };

  useEffect(() => {
    if (!hasName || !levelData?.id || runData) return;

    const startRun = async () => {
      try {
        setRunLoading(true);

        const run = await runsApi.create({
          name: playerName,
          levelId: levelData.id
        });

        setRunData(run);

        setCharacters(
          levelData.characters.map(c => {
            const start = parseISO(run.startTime);
            const foundAt = run.characters.find(rc => rc.characterId === c.id)?.foundAt;
            const foundTime = foundAt ? parseISO(foundAt) : null;
            const diff = foundTime ? foundTime.getTime() - start.getTime() : 0;
            const elapsedTime = foundAt ? formatDuration(diff) : undefined;
            return {
              ...c,
              found: run.characters.some(rc => rc.characterId === c.id),
              elapsedTime
            }
          })
        );

      } catch (error) {
        console.error("Error starting run:", error);
        setRunError(error);
      } finally {
        setRunLoading(false);
      }
    };

    startRun();
  }, [playerName, levelData?.id, hasName]);
  
  useEffect(() => {
    if (characters.length === 0) return;

    const allFound = characters.every(c => c.found);

    if (allFound) {
      setLevelComplete(true);
    }
  }, [characters]);

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

  if (levelLoading || runLoading) return <PageLoading />;

  if (levelError) {
    console.error("Error loading level:", levelError);
    return <PageError message="Failed to load level. Please try again later." />;
  }

  if (!levelData) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold text-center mb-4">Level not found</h2>
      <p className="text-lg text-center">The level you are looking for does not exist.</p>
    </div>
  );

  if (runError) {
    console.error("Error starting run:", runError);
    return <PageError message="Failed to start run. Please try again later." />;
  }

  if (!runData) return <PageError message="Run not found." />;

  return (
    <div className="container flex flex-col items-center mx-auto px-2">
      <div className="flex gap-4 my-6">
        {characters.map((character) => (
          <div key={character.id} className="overflow-hidden relative">
            <img
              src={character.imgUrl}
              alt={character.name}
              className="w-18 h-18 object-contain"
            />
            {character.found && (
              <div className="absolute inset-0 bg-green-500/25 flex items-center justify-center">
                <p className="text-black font-bold opacity-50">Found!</p>
              </div>
            )}
            <div className="absolute inset-0 -bottom-1 flex items-end justify-center p-1">
              <p className="text-black font-bold text-sm">
                {!!character.elapsedTime && character.found ?
                  `${character.elapsedTime}`
                  :"--:--:--"
                }
              </p>
            </div>
          </div>
        ))}
        <div className="hidden lg:flex lg:flex-col lg:items-center lg:justify-center lg:gap-1">
          <label
            htmlFor="magnifier"
            className={`flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition 
              ${magnifierEnabled
                ? "bg-blue-300 text-white shadow-md scale-105"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"}
            `}
          >🔍</label>
          <input id="magnifier" type="checkbox" checked={magnifierEnabled} onChange={toggleMagnifier} hidden/>
        </div>
      </div>

      <div className="w-full overflow-x-auto mb-4">
        <div className="flex justify-center min-w-max">
          <div className="relative border">
            <img
              ref={imageRef}
              src={levelData.imgUrl}
              alt={levelData.name}
              onClick={handleImageClick}
              onMouseMove={handleImageMouseMove}
              onMouseLeave={handleImageMouseLeave}
              onContextMenu={(e) => {
                e.preventDefault();
                toggleMagnifier();
              }}
              className={`min-h-[70vh] max-w-none ${magnifierEnabled ? "cursor-none" : "cursor-crosshair"}`}
            />

            {foundAnimations.map(anim => (
              <div
                key={anim.id}
                className="absolute pointer-events-none"
                style={{
                  left: anim.x,
                  top: anim.y,
                  transform: "translate(-50%, -50%)"
                }}
              >
                <div className="w-16 h-16 rounded-full border-4 border-green-400 animate-ping"></div>
              </div>
            ))}

            {(magnifierEnabled && hoverPosition) && (
              <MagnifierCursor 
                size={MAGNIFIER_SIZE}
                zoom={MAGNIFIER_ZOOM}
                hoverPosition={hoverPosition}
                imageUrl={levelData.imgUrl}
                imageRef={imageRef}
              />
            )}

            <CharactersSelector
              characters={characters}
              position={clickPosition}
              visible={visibleSelector}
              setVisible={setVisibleSelector}
              setCharacters={setCharacters}
              run={runData}
              imageRef={imageRef}
              onCharacterFound={triggerFoundAnimation}
            />
          </div>
        </div>
      </div>

      <Leaderboard levelName={levelData.name} runs={levelData.runs}/>

      {!hasName && <NamePrompt saveName={saveName} />}

      {levelComplete && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl text-center shadow-lg relative">
            <h2 className="text-3xl font-bold mb-2">🎉 Level Complete!</h2>
            <p className="mb-4">You found all characters!</p>

            <p className="text-sm text-gray-500">
              Total time: {
                characters
                  .filter(c => c.found && c.elapsedTime)
                  .sort((a, b) => (a.elapsedTime! > b.elapsedTime! ? -1 : 1))[0]
                  ?.elapsedTime
              }
            </p>

            <button
              onClick={() => setLevelComplete(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}