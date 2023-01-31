import { TagsReponse } from "./../types/tag";
import { API_BASE_URL } from "./../utils/constant";
const TagAPI = {
  getAllTags: async (): Promise<TagsReponse> => {
    const res = await fetch(`${API_BASE_URL}/tags`);

    const data = await res.json();

    return data as TagsReponse;
  },
};

export default TagAPI;
