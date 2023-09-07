import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repositories";
import { FetchPetsByOrgIdUseCase } from "../pets/fetch-pets-by-org";

export function makeFetchPetsByOrgIdUseCase() {
    const petsRepository = new PrismaPetsRepository();
    const useCase = new FetchPetsByOrgIdUseCase(petsRepository);
    
    return useCase;
}