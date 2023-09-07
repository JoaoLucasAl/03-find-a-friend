import { makefetchOrgsByCityUseCase } from "@/use-cases/factories/make-fetch-orgs-by-city-use-case";
import { makeFetchPetsByOrgIdUseCase } from "@/use-cases/factories/make-fetch-pets-by-org-id";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchPetsByOrg(request: FastifyRequest, reply: FastifyReply) {
    
    const fetchPetsByOrgParamsSchema = z.object({
        org_id: z.string(),
    })

    const { org_id } = fetchPetsByOrgParamsSchema.parse(request.params)

    try {

        const fetchPetsByOrgIdUseCase = makeFetchPetsByOrgIdUseCase();

        const { pets } = await fetchPetsByOrgIdUseCase.execute({
            orgId: org_id,
        })

        reply.status(200).send(pets);
        
    } catch (error) {
        reply.status(400).send({error})
        throw error;
    }

}
