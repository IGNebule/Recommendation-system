const fs = require("fs");
const path = require("path");

const service = require("./services");
const User = require("../../models/user");

const getRecommend = async (req, res) => {
  try {
    const { game } = req.query;

    const recs = await service.getRecommendations(game);

    res.json({ Recommendations: recs });
  } catch (err) {
    console.error("ML Error: ", err.message);
    return res.status(500).json({ error: err.message });
  }
};

const savePreference = async (req, res) => {
  try {
    const { game } = req.body;
    const email = req.user.email;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        Error: "User not found",
      });
    }

    if (!game) {
      return res.status(400).json({
        Error: "Game is required",
      });
    }

    if (!user.preferences) {
      user.preferences = [];
    }

    if (!user.preferences.includes(game)) {
      user.preferences.push(game);
      await user.save();
    }

    return res.json({
      Message: "Preference saved",
      preferences: user.preferences,
    });
  } catch (err) {
    console.error(err.message);
  }
};

const getPersonalized = async (req, res) => {
  const email = req.user.email;
  const user = await User.findOne({ email });

  if (!user || !user.preferences || user.preferences.length === 0) {
    return res.json({
      preferences: [],
      Recommendations: [],
    });
  }

  try {
    const scoreMap = {};
    const weight = user.preferences.length;

    for (let game of user.preferences) {
      const recs = await service.getRecommendations(game);

      recs.forEach((rec, index) => {
        const gameName = rec.game;
        const simScore = rec.score;

        const baseScore = (5 - index) * simScore;

        if (!scoreMap[gameName]) {
          scoreMap[gameName] = 0;
        }

        scoreMap[gameName] += baseScore * weight;
      });
    }

    const ranked = Object.entries(scoreMap)
      .sort((a, b) => b[1] - a[1])
      .map(([game, score]) => ({
        game,
        score: Number(score.toFixed(4)),
      }));

    const logData = ranked.slice(0, 20).map((item) => ({
      game: item.game,
      score: item.score,
    }));

    fs.writeFileSync(
      path.join(__dirname, "../../../preprocessing/evaluation/logs.json"),
      JSON.stringify(
        {
          user: req.user.email,
          preferences: user.preferences,
          recommendations: logData,
        },
        null,
        2,
      ),
    );

    return res.json({
      preferences: user.preferences,
      recommendations: logData,
    });
  } catch (err) {
    console.error("ML ERROR: ", err.message);
    return res.status(500).json({ Error: "ML Service error" });
  }
};

module.exports = {
  getRecommend,
  savePreference,
  getPersonalized,
};
