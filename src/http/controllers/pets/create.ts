import { makeCreatePetUseCase } from "@/use-cases/factories/make-create-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
    const createPetBodySchema = z.object({
        name: z.string(),
        type: z.string(),
        breed: z.string(),
        color: z.string(),
        age: z.number().int().positive(),
        weight: z.number().positive(),
        description: z.string().optional(),
    })

    const { name, type, breed, color, age, weight, description } = createPetBodySchema.parse(request.body)

    const orgId = request.user.sign.sub;

    const createPetUseCase = makeCreatePetUseCase();

   try {
    await createPetUseCase.execute({
        name,
        type,
        breed,
        color,
        age,
        weight,
        description,
        orgId
    })

    reply.status(201).send();
   }
    catch (error) {
        reply.status(400).send({error})
        throw error;
    }
}