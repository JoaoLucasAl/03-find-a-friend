import { makeGetOrgUseCase } from "@/use-cases/factories/make-get-org-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getOrg(request: FastifyRequest, reply: FastifyReply) {
    
    const getOrgParamsSchema = z.object({
        id: z.string().uuid(),
    })

    const { id } = getOrgParamsSchema.parse(request.params)

    try {

        const getOrgUseCase = makeGetOrgUseCase()

        const { org } = await getOrgUseCase.execute({
            orgId: id
        })

        reply.status(200).send({
            org: {
                ...org,
                password_hash: undefined
            }
        });
        
    } catch (error) {
        reply.status(400).send({error})
        throw error;
    }

}
