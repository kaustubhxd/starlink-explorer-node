import express from 'express'
import validate from '../../middlewares/validate.js'
import { getStarlink, postStarlinkQuery } from '../../controllers/starlinkController.js'
import { getStarlinkValidate, postStarlinkQueryValidate } from '../../validations/starlinkValidate.js'

const router = express.Router()

// GET
router.get(
  '/:id(*)',
  validate(getStarlinkValidate),
  getStarlink
)

// POST
router.post(
  '/query',
  validate(postStarlinkQueryValidate),
  postStarlinkQuery
)

export default router
