import axios from 'axios'

const STARLINK_API_URL = 'https://api.spacexdata.com/v4/starlink'

const axiosClient = axios.create({
  baseURL: STARLINK_API_URL
})

export default axiosClient
