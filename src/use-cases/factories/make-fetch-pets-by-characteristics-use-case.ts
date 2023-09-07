import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repositories";
import { FetchPetsByCharacteristicsUseCase } from "../pets/fetch-pets-by-characteristics";

export function makeFetchPetsByCharacteristicsUseCase() {
    const petsRepository = new PrismaPetsRepository();
    const useCase = new FetchPetsByCharacteristicsUseCase(petsRepository);
    
    return useCase;
}