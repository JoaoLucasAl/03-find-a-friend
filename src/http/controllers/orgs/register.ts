import { OrgAlreadyExistsError } from "@/use-cases/errors/org-already-exists-error";
import { makeRegisterOrgUseCase } from "@/use-cases/factories/make-register-org-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply){
    const registerBodySchema = z.object({
        name: z.string().min(3),
        email: z.string().email(),
        city: z.string().min(3),
        phone: z.string().min(11).max(11),
        password: z.string().min(6)
    });

    const { name, email, city, phone, password } = registerBodySchema.parse(request.body);

    try {
        const registerUseCase = makeRegisterOrgUseCase()

        await registerUseCase.execute({
            name,
            email,
            city,
            phone,
            password
        });

    } catch (error) {
        if (error instanceof OrgAlreadyExistsError) {
            return reply.status(409).send({
                message: error.message
            })
        }      

        throw error;
    }

    return reply.status(201).send();
}