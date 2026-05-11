import API from "../api/api";

export const getRecommendations = async () => {
  const res = await API.get("/recommend");

  return res.data;
};

export const getGames = async () => {
  const res = await API.get("/games");

  return res.data;
};

export const savePreference = async (game) => {
  const res = await API.post("/recommend/preferences", {
    game,
  });

  return res.data;
};

export const removePreference = async (game) => {
  const res = await API.delete("/recommend/preferences", {
    data: { game },
  });

  return res.data
}