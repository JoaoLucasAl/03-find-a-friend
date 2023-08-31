import { PrismaOrgsRepositories } from "@/repositories/prisma/prisma-orgs-repositories";
import { AuthenticateUseCase } from "../orgs/authenticate";

export function makeAuthenticateUseCase() {
    const orgsRepository = new PrismaOrgsRepositories();
    const useCase = new AuthenticateUseCase(orgsRepository);

    return useCase;
}