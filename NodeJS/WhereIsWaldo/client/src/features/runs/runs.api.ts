import apiFetch from "../../utils/apiFetch";
import type { CreateRunRequest } from "./runs.types";

const RUNS_URL = "runs";

const runsApi = Object.freeze({
  async create(data: CreateRunRequest) {
    return await apiFetch(`${RUNS_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
});

export default runsApi;