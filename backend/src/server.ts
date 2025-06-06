import Fastify from 'fastify'
import cors from '@fastify/cors'
import customerRoutes from './routes/customer'
import assetRoutes from './routes/assets'
import authRoutes from './routes/auth'

const app = Fastify()

app.register(cors, {
  origin: "*",
  methods: ['GET', 'POST', 'PATCH', 'DELETE', "PUT", "OPTIONS"]
})

app.register(customerRoutes, { prefix: '/customers' })
app.register(authRoutes)
app.register(assetRoutes, { prefix: '/assets' })

app.listen({ port: 3333 }, () => {
})
