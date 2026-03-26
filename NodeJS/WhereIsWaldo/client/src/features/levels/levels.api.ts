import apiFetchJson from "../../utils/apiFetchJson";
import type { Level, LevelDetail } from "./levels.types";

const LEVELS_URL = "levels";

const levelsApi = Object.freeze({
  async getLevels() {
    return await apiFetchJson<Level[]>(`${LEVELS_URL}`);
  },

  async getLevel(id: number) {
    return await apiFetchJson<LevelDetail>(`${LEVELS_URL}/${id}`);
  }
})

export default levelsApi;