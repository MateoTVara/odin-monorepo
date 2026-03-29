import { parseISO } from "date-fns";
import type { LevelCharacter } from "../features/characters/characters.types";
import runsApi from "../features/runs/runs.api";
import type { CreateRunResponse } from "../features/runs/runs.types";
import formatDuration from "../utils/formatDuration";

type Props = {
  characters: (LevelCharacter & { found: boolean, elapsedTime?: string })[];
  position: { x: number; y: number } | null;
  visible: boolean;
  setVisible: (v: boolean) => void;
  // simulate character found logic, in real app this would be handled differently
  setCharacters: React.Dispatch<React.SetStateAction<(LevelCharacter & { found: boolean, elapsedTime?: string })[]>>;

  run: CreateRunResponse
};

export default function CharactersSelector({
  characters,
  position,
  visible,
  setVisible,
  setCharacters,
  run
}: Props) {
  if (!visible || !position) return null;

  const handleClick = async (character: LevelCharacter) => {
    setVisible(false);
    const response = await runsApi.markCharacterFound(position, {
      runId: run.id, characterId: character.id
    });
    setCharacters(prev =>
      prev.map(c => {
        if (c.id !== character.id) return c;
        if (response) { 
          const start = parseISO(run.startTime);
          const foundTime = parseISO(response.foundAt);
          const diff = foundTime.getTime() - start.getTime();
          const elapsedTime = formatDuration(diff);
          return {...c, found: true, elapsedTime}
        }
        return c;
      })
    )
  };

  return (
    <div
      className="flex flex-col gap-1 absolute bg-white p-2 rounded-lg shadow-lg"
      style={{
        left: position.x,
        top: position.y
      }}
    >
      {characters
        .filter(c => !c.found)
        .map((character) => (
          <button
            key={character.id}
            className="flex items-center gap-2 hover:bg-gray-200 rounded-md p-2"
            onClick={() => handleClick(character)}
          >
            <img
              src={character.imgUrl}
              alt={character.name}
              className="w-8 h-8 object-contain"
            />
            <p>{character.name}</p>
          </button>
      ))}
    </div>
  );
}