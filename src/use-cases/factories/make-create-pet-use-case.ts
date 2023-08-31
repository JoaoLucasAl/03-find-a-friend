import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repositories";
import { CreatePetUseCase } from "../pets/create-pet";
import { PrismaOrgsRepositories } from "@/repositories/prisma/prisma-orgs-repositories";

export function makeCreatePetUseCase() {
    const petsRepository = new PrismaPetsRepository();
    const orgsRepository = new PrismaOrgsRepositories();
    const useCase = new CreatePetUseCase(petsRepository, orgsRepository);

    return useCase;
}