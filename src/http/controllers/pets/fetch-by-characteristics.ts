import { makeFetchPetsByCharacteristicsUseCase } from "@/use-cases/factories/make-fetch-pets-by-characteristics-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchPetsByCharacteristics(request: FastifyRequest, reply: FastifyReply) {
    
    const fetchPetsByCharacteristicsQuerySchema = z.object({
        city: z.string(),
        type: z.string().optional(),
        breed: z.string().optional(),
        color: z.string().optional(),
        age: z.number().int().positive().optional(),
        weight: z.number().positive().optional()
    })

    const { city, type, breed, color, age, weight } = fetchPetsByCharacteristicsQuerySchema.parse(request.query)

    try {

        const fetchPetsByCharacteristicsUseCase = makeFetchPetsByCharacteristicsUseCase();

        const { pets } = await fetchPetsByCharacteristicsUseCase.execute({
            city,
            type,
            breed,
            color,
            age,
            weight
        })

        reply.status(200).send({
            pets
        });
        
    } catch (error) {
        reply.status(400).send({error})
        throw error;
    }

}
