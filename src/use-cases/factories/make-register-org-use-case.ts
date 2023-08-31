import { PrismaOrgsRepositories } from "@/repositories/prisma/prisma-orgs-repositories";
import { RegisterOrgUseCase } from "../orgs/register";

export function makeRegisterOrgUseCase() {
    const orgsRepository = new PrismaOrgsRepositories();
    const useCase = new RegisterOrgUseCase(orgsRepository);

    return useCase;
}