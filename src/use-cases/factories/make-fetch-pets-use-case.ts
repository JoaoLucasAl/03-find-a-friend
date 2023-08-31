import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repositories";
import { FetchPetsUseCase } from "../pets/fetch-pets";

export function makeFetchPetsUseCase() {
    const petsRepository = new PrismaPetsRepository();
    const useCase = new FetchPetsUseCase(petsRepository);
    
    return useCase;
}