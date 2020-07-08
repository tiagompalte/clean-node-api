import request from 'supertest'
import app from '../config/app'

describe('CORS Middleware', () => {
  app.get('/test_cors', (req, res) => {
    res.send()
  })
  test('Should enable CORS', async () => {
    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
