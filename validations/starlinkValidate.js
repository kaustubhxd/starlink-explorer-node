import Joi from 'joi'

// @desc Get starlink
const getStarlinkValidate = {
  query: Joi.object({
    id: Joi.string()
  })
}

const postStarlinkQueryValidate = {
  body: Joi.object().keys({
    page: Joi.number(),
    limit: Joi.number(),
    status: Joi.number(),
    type: Joi.string(),
    dateRange: Joi.object().keys({
      startDate: Joi.string().allow(null),
      endDate: Joi.string().allow(null)
    })
  })
}

export {
  getStarlinkValidate,
  postStarlinkQueryValidate
}
