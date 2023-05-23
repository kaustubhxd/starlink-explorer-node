import express from 'express'
import expressAsyncHandler from 'express-async-handler'

import starlinkRoute from './v1/starlinkRoute.js'
const router = express.Router()

// Check if server is online
router.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Server online' })
  })
)

router.get(
  '/v1',
  expressAsyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Server online' })
  })
)

// Routes
router.use('/v1/starlink', starlinkRoute)

export default router
