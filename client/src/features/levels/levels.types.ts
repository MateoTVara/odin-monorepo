import type { Character } from "../characters/characters.types";

export interface Level {
  id: number;
  name: string;
  imgUrl: string;
}

export interface LevelDetail extends Level {
  characters: Character[];
}