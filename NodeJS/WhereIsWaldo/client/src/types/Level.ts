import type { Character } from "./Character";

export interface Level {
  id: number;
  name: string;
  img_url: string;
}

export interface LevelDetail extends Level {
  characters: Character[];
}