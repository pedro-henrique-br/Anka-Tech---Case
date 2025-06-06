// backend/src/server.ts
import Fastify from 'fastify'
import cors from '@fastify/cors'
import customerRoutes from './routes/customer'
import assetRoutes from './routes/assets'

const app = Fastify()

app.register(cors, {
  origin: "*",
  methods: ['GET', 'POST', 'PATCH', 'DELETE', "PUT", "OPTIONS"], // ✅ adicione todos os métodos que você usa
})

app.register(customerRoutes, { prefix: '/customers' })

app.register(assetRoutes, { prefix: '/assets' })

app.listen({ port: 3333 }, () => {
  console.log('Running on http://localhost:3333')
})
