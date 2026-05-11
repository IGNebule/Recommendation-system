import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import PreferenceList from "../components/PreferenceList";
import RecommendationList from "../components/RecommendationList";
import BrowseGames from "../components/BrowseGames";
import Loading from "../components/Loading";

import {
  getRecommendations,
  getGames,
  savePreference,
  removePreference,
} from "../services/recommendService";

import { checkAuth, logoutUser } from "../hooks/useAuth";

const Dashboard = () => {
  const [preferences, setPreferences] = useState([]);
  const [recs, setRecs] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    if (!checkAuth()) {
      navigate("/login");
      return;
    }

    fetchData();
  }, []);

  // =========================
  // FETCH DATA
  // =========================

  const fetchData = async () => {
    try {
      setLoading(true);

      const recData = await getRecommendations();
      const gameData = await getGames();

      setPreferences(recData.preferences);
      setRecs(recData.recommendations);
      setGames(gameData);
    } catch (err) {
      console.error(err);

      logoutUser();

      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SAVE PREFERENCE
  // =========================

  const handleSavePreference = async (game) => {
    try {
      await savePreference(game);

      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const handleDeletePreference = async (game) => {
    try {
      await removePreference(game)

      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logoutUser();

    navigate("/login");
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return <Loading />;
  }

  // =========================
  // UI
  // =========================

  return (
    <div style={{ padding: "20px" }}>
      <Header onLogout={handleLogout} />

      <PreferenceList preferences={preferences} onDelete={handleDeletePreference} />

      <RecommendationList recs={recs} onSave={handleSavePreference} />

      <BrowseGames games={games} onSave={handleSavePreference} />
    </div>
  );
};

export default Dashboard;
