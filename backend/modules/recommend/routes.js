const express = require('express')
const router = express.Router()
const controller = require('./controller')

router.post('/', controller.savePreference)
router.get('/', controller.getPersonalized)
router.get('/', controller.getRecommend)

module.exports = router