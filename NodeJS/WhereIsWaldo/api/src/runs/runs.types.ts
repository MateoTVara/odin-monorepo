export interface CreateRunDTO {
  name: string;
  levelId: number;
}

export interface CreateRunInput extends CreateRunDTO {
  sessionId: string;
}