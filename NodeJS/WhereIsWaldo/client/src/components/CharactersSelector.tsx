import type { Character } from "../features/characters/characters.types";
import runsApi from "../features/runs/runs.api";

type Props = {
  characters: (Character & { found: boolean })[];
  position: { x: number; y: number } | null;
  visible: boolean;
  setVisible: (v: boolean) => void;
  // simulate character found logic, in real app this would be handled differently
  setCharacters: React.Dispatch<React.SetStateAction<(Character & { found: boolean })[]>>;

  runId: number
};

export default function CharactersSelector({
  characters,
  position,
  visible,
  setVisible,
  setCharacters,
  runId
}: Props) {
  if (!visible || !position) return null;

  const handleClick = async (character: Character) => {
    setVisible(false);
    const response = await runsApi.markCharacterFound(position, {
      runId, characterId: character.id
    });
    setCharacters(prev =>
      prev.map(c => {
        if (c.id !== character.id) return c;
        if (response) return { ...c, found: true }
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
      {characters.map((character) => (
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