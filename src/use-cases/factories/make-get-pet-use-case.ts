import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repositories";
import { GetPetUseCase } from "../pets/get-pet";

export function makeGetPetUseCase() {
    const petsRepository = new PrismaPetsRepository();
    const useCase = new GetPetUseCase(petsRepository);
    
    return useCase;
}