// const devBaseURL = "http://123.207.32.32:9001"
const devBaseURL = 'http://localhost:3000'
const proBaseURL = 'https://netease-cloud-music-api-alpha-cyan.vercel.app'
export const BASE_URL =
  process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL

export const TIMEOUT = 6000
