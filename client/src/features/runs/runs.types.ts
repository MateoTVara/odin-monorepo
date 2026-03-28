export interface CreateRunRequest {
  name: string;
  levelId: number;
}

export interface CreateRunResponse {
  id: number;
  name: string;
  levelId: number;
  sessionId: string;
  passed: boolean;
  startTime: string;
  finishTime: string | null;
}

export interface MarkCharacterFoundInput {
  x: number;
  y: number;
}

export interface MarkCharacterFoundParams {
  runId: number;
  characterId: number;  
}

export interface MarkCharacterFoundResponse {
  foundAt: string;
  runId: number;
  characterId: number;
}