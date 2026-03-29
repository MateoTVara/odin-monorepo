export interface LevelCharacter {
  id: number;
  name: string;
  imgUrl: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface RunCharacter {
  characterId: number;
  foundAt: string;
}