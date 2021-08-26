const express = require('express')
const candidateController = require('../controllers/candidate')

const router = express.Router()

router.post('/candidate', candidateController.registerCandidate)

module.exports = router;