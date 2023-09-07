import { PrismaOrgsRepositories } from "@/repositories/prisma/prisma-orgs-repositories";
import { FetchOrgsByCityUseCase } from "../orgs/fetch-orgs-by-city";

export function makefetchOrgsByCityUseCase() {
    const orgsRepository = new PrismaOrgsRepositories()
    const useCase = new FetchOrgsByCityUseCase(orgsRepository);
    
    return useCase;
}