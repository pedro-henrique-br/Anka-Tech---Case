import { FastifyInstance } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

export default async function assetRoutes(app: FastifyInstance) {
  // Cadastrar novo ativo e associar a um cliente
  app.post('/', async (request, reply) => {
    const bodySchema = z.object({
      name: z.string(),
      value: z.number(),
      customerId: z.number()
    })

    const { name, value, customerId } = bodySchema.parse(request.body)

    try {
      const asset = await prisma.asset.create({
        data: {
          name,
          value,
          allocations: {
            create: {
              customerId
            }
          }
        }
      })

      return reply.status(201).send(asset)
    } catch (error) {
      console.error(error)
      return reply.status(500).send({ message: 'Erro ao criar ativo' })
    }
  })

  app.get('/', async () => {
    const assets = await prisma.asset.findMany()
    return assets
  })


  // Listar ativos por cliente
  app.get('/:customerId', async (request, reply) => {
    const paramsSchema = z.object({
      customerId: z.string()
    })

    const { customerId } = paramsSchema.parse(request.params)

    try {
      const allocations = await prisma.assetAllocation.findMany({
        where: { customerId: Number(customerId) },
        include: {
          asset: true
        }
      })

      const assets = allocations.map(a => ({
        id: a.asset.id,
        name: a.asset.name,
        value: a.asset.value,
        createdAt: a.createdAt
      }))

      return reply.send(assets)
    } catch (error) {
      console.error(error)
      return reply.status(500).send({ message: 'Erro ao buscar ativos' })
    }
  })
}
