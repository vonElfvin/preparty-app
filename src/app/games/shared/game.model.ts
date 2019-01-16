export interface Game {
  id?: string;
  name: string;
  image_path: string;
  menuImagePath: string;
  urlPath: string;
  description: string;
  backgroundColor: string;
  timer?: number;
}
