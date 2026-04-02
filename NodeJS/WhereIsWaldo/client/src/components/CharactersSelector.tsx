import { parseISO } from "date-fns";
import type { LevelCharacter } from "../features/characters/characters.types";
import runsApi from "../features/runs/runs.api";
import type { CreateRunResponse } from "../features/runs/runs.types";
import formatDuration from "../utils/formatDuration";
import { useLayoutEffect, useRef, useState } from "react";

type Props = {
  characters: (LevelCharacter & { found: boolean; elapsedTime?: string })[];
  position: { x: number; y: number } | null;
  visible: boolean;
  setVisible: (v: boolean) => void;
  setCharacters: React.Dispatch<
    React.SetStateAction<(LevelCharacter & { found: boolean; elapsedTime?: string })[]>
  >;
  run: CreateRunResponse;
  imageRef: React.RefObject<HTMLImageElement> | null;
  onCharacterFound: (x: number, y: number) => void;
};

export default function CharactersSelector({
  characters,
  position,
  visible,
  setVisible,
  setCharacters,
  run,
  imageRef,
  onCharacterFound
}: Props) {

  const [selectorPosition, setSelectorPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!visible || !position || !imageRef) return;

    const el = ref.current;
    const img = imageRef.current;

    if (!el || !img) return;

    const menuRect = el.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();

    let x = position.x;
    let y = position.y;

    const maxX = imgRect.width - menuRect.width;
    const maxY = imgRect.height - menuRect.height;

    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    setSelectorPosition({ x, y });

  }, [position, visible]);

  const handleClick = async (character: LevelCharacter) => {
    if (!position) return;

    setVisible(false);

    const response = await runsApi.markCharacterFound(position, {
      runId: run.id,
      characterId: character.id
    });

    if (response) onCharacterFound(position.x, position.y);

    setCharacters(prev =>
      prev.map(c => {
        if (c.id !== character.id) return c;

        if (response) {
          const start = parseISO(run.startTime);
          const foundTime = parseISO(response.foundAt);
          const diff = foundTime.getTime() - start.getTime();
          const elapsedTime = formatDuration(diff);

          return { ...c, found: true, elapsedTime };
        }

        return c;
      })
    );
  };

  return (
    <div
      ref={ref}
      className="flex flex-col gap-1 absolute bg-white p-2 rounded-lg"
      style={{
        left: selectorPosition.x,
        top: selectorPosition.y,
        visibility: visible ? "visible" : "hidden"
      }}
    >
      {characters
        .filter(c => !c.found)
        .map(character => (
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