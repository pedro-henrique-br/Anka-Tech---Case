import { FastifyInstance } from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function customerRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    const customers = await prisma.customer.findMany();
    return customers;
  });

  app.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    const customer = await prisma.customer.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!customer) {
      return reply.status(404).send({ message: "Cliente não encontrado" });
    }

    return customer;
  });

  // Atualizar cliente por ID
  app.put("/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const bodySchema = z.object({
      name: z.string().min(1),
      email: z.string().email(),
    });

    const { id } = paramsSchema.parse(request.params);
    const { name } = bodySchema.parse(request.body);
    const { email } = bodySchema.parse(request.body);

    try {
      const customer = await prisma.customer.update({
        where: { id: Number(id) },
        data: { name, email },
      });

      return reply.send(customer);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ message: "Erro ao atualizar cliente" });
    }
  });

  // PATCH /customers/:id/status
  app.patch("/:id/status", async (request, reply) => {
    const { id } = request.params as { id: number };
    const { status } = request.body as { status: "Ativo" | "Inativo" };

    try {
      const updated = await prisma.customer.update({
        where: { id: Number(id) },
        data: { status: String(status) },
      });

      return reply.send(updated);
    } catch (error) {
      console.log(error);
      return reply.status(500).send({ message: "Erro ao atualizar status." });
    }
  });

  app.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: number };

    try {
      await prisma.customer.delete({
        where: { id: Number(id) },
      });
      return reply.status(204).send();
    } catch (error) {
      return reply.status(500).send({ message: error });
    }
  });

  app.post("/", async (request, reply) => {
    const createCustomerSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      status: z.enum(["Ativo", "Inativo"]).optional(),
    });

    const parsed = createCustomerSchema.parse(request.body);

    const customer = await prisma.customer.create({
      data: {
        ...parsed,
        status: parsed.status ?? "Ativo",
      },
    });
    return reply.status(201).send(customer);
  });
}
