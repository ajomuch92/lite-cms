import express, { json, urlencoded } from 'express'

const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))

app.get('/', (_req, res) => {
  res.json({ message: 'hello world' })
})

const api = {
  path: '/api',
  handler: app
}

export default api
