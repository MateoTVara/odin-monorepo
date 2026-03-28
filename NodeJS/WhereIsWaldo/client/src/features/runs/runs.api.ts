import apiFetchJson from "../../utils/apiFetchJson";
import type { CreateRunRequest, CreateRunResponse, MarkCharacterFoundInput, MarkCharacterFoundParams, MarkCharacterFoundResponse } from "./runs.types";

const RUNS_URL = "runs";

const runsApi = Object.freeze({
  async create(data: CreateRunRequest) {
    return await apiFetchJson<CreateRunResponse>(`${RUNS_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },

  async markCharacterFound(data: MarkCharacterFoundInput, params: MarkCharacterFoundParams) {
    return await apiFetchJson<MarkCharacterFoundResponse>(
      `${RUNS_URL}/${params.runId}/characters/${params.characterId}/found`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
  }
});

export default runsApi;