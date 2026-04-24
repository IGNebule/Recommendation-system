const service = require("./services");
const users = require('../auth/user')

const getRecommend = async (req, res) => {
  try {
    const { game } = req.query;

    const recs = await service.getRecommendations(game);

    res.json({ Recommendations: recs });

  } catch (err) {
    console.error("ML Error: ", err.message)
    return res.status(500).json({ error: err.message })
  }
};

const savePreference = async (req, res) => {
  try {
    const { game } = req.body
    const email = req.user.email
    const user = users.find(u => u.email === email)

    if (!user) {
      return res.status(404).json({
        Error: 'User not found'
      })
    }

    if (!game) {
      return res.status(404).json({
        Error: 'Game is required'
      })
    }

    if (!user.preferences.includes(game)) {
      user.preferences.push(game)
    }

    return res.json({
      Message: 'Preference saved',
      preferences: user.preferences
    })
  } catch (err) {
    console.error(err.message)
  }
}

const getPersonalized = async (req, res) => {
  const email = req.user.email
  const user = users.find(u => u.email === email)

  if (!user || user.preferences.length === 0) {
    return res.json({
      preferences: [],
      Recommendations: []
    })
  }

  try {
    let allRecs = []

    for (let game of user.preferences) {
      const recs = await service.getRecommendations(game)
      allRecs = allRecs.concat(recs)
    }
    
    const unique = [...new Set(allRecs)]

    return res.json({
      preferences: user.preferences,
      recommendations: unique.slice(0, 20)
    })

  } catch (err) {
    console.error('ML ERROR: ', err.message)
    return res.status(500).json({ Error:'ML Service error' })
  }
}

module.exports = {
  getRecommend, savePreference, getPersonalized
};
