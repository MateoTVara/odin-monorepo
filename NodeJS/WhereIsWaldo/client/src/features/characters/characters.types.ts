export interface Character {
  character: {
    id: number;
    name: string;
    img_url: string;
  };
  x: number;
  y: number;
  width: number;
  height: number;
}