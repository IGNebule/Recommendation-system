import API from "../api/api";

export const fetchDashboardData = async () => {
  const recRes = await API.get("/recommend");
  const gamesRes = await API.get("/games");

  return {
    preferences: recRes.data.preferences,
    recommendations: recRes.data.recommendations,
    games: gamesRes.data,
  };
};
