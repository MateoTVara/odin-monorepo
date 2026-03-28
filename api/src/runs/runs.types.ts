export interface CreateRunDTO {
  name: string;
  levelId: number;
}

export interface CreateRunInput extends CreateRunDTO {
  sessionId: string;
}

export interface MarkCharacterFoundDTO {
  x: number;
  y: number;
}

export interface MarkCharacterFoundParams {
  runId: number;
  characterId: number;
}

export interface MarkCharacterFoundInput extends MarkCharacterFoundDTO, MarkCharacterFoundParams {}