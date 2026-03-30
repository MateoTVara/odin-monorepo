import type { LevelCharacter } from "../characters/characters.types";

export interface Level {
  id: number;
  name: string;
  imgUrl: string;
}

export interface LevelDetail extends Level {
  characters: LevelCharacter[];
  runs: {
    name: string;
    startTime: string;
    finishTime: string;
  }[];
}