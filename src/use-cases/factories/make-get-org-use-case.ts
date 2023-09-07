import { PrismaOrgsRepositories } from "@/repositories/prisma/prisma-orgs-repositories";
import { GetOrgUseCase } from "../orgs/get-org";

export function makeGetOrgUseCase() {
    const orgsRepository = new PrismaOrgsRepositories()
    const useCase = new GetOrgUseCase(orgsRepository);
    
    return useCase;
}