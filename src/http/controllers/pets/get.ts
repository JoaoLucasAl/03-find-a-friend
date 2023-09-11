import { makeGetPetUseCase } from "@/use-cases/factories/make-get-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
    
    const getPetParamsSchema = z.object({
        id: z.string().uuid(),
    })

    const { id } = getPetParamsSchema.parse(request.params)

    try {

        const getPetUseCase = makeGetPetUseCase()

        const { pet } = await getPetUseCase.execute({
            petId: id
        })

        reply.status(200).send({
            pet
        });
        
    } catch (error) {
        reply.status(400).send({error})
        throw error;
    }

}
