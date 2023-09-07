import { makefetchOrgsByCityUseCase } from "@/use-cases/factories/make-fetch-orgs-by-city-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchOrgsByCity(request: FastifyRequest, reply: FastifyReply) {
    
    const fetchOrgsByCityParamsSchema = z.object({
        city: z.string(),
    })

    const { city } = fetchOrgsByCityParamsSchema.parse(request.params)

    try {

        const fetchOrgsByCityUseCase = makefetchOrgsByCityUseCase();

        const { orgs } = await fetchOrgsByCityUseCase.execute({city})

        reply.status(200).send(orgs);
        
    } catch (error) {
        reply.status(400).send({error})
        throw error;
    }

}
