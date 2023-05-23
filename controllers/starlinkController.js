import expressAsyncHandler from 'express-async-handler'
import axiosClient from '../config/axiosClient.js'
import { SAT_STATUS, SAT_TYPE } from '../helpers/constants.js'

const getStarlink = expressAsyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    const response = await axiosClient.get(`/${id}`)

    res.status(200).json(response.data)
  } catch (e) {
    res.status(500).json({ message: e })
  }
})

const postStarlinkQuery = expressAsyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    status = 0,
    type,
    dateRange
  } = req.body

  console.log('body: ', page, limit, status, type, dateRange)

  const getDecayValue = (status) => {
    const { DECAYED, OPERATIONAL, BOTH } = SAT_STATUS
    switch (status) {
      case DECAYED:
        return { $eq: null }
      case OPERATIONAL:
        return { $ne: null }
      case BOTH:
      default:
        return undefined
    }
  }

  const getTypeValue = (type) => {
    const { ALL } = SAT_TYPE
    switch (type) {
      case undefined:
      case null:
      case ALL:
        return { $ne: null }
      default:
        return { $eq: type }
    }
  }

  const getDateRangeValue = (dateRange) => {
    const payload = {}
    if (dateRange?.startDate) payload.$gte = dateRange?.startDate
    if (dateRange?.endDate) payload.$lte = dateRange?.endDate

    if (Object.keys(payload).length === 0) return undefined
    return payload
  }

  try {
    axiosClient.post('https://api.spacexdata.com/v4/starlink/query', {
      query: {
        latitude: getDecayValue(status),
        version: getTypeValue(type),
        'spaceTrack.LAUNCH_DATE': getDateRangeValue(dateRange)
      },
      options: {
        limit,
        page,
        pagination: true,
        sort: {
          'spaceTrack.LAUNCH_DATE': 'desc'
        },
        select: [
          'height_km',
          'latitude',
          'longitude',
          'velocity_kms',
          'version',
          'id',
          'spaceTrack.OBJECT_NAME',
          'spaceTrack.LAUNCH_DATE',
          'spaceTrack.DECAYED',
          'spaceTrack.DECAY_DATE'
        ]
      }
    }).then(result => {
      // console.log({ result })
      res.status(200).json(result.data)
    })
  } catch (e) {
    res.status(500).json({ message: 'Error getting data: ', error: e })
  }
})

export {
  getStarlink,
  postStarlinkQuery
}
