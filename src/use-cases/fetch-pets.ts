import { FindPetsByQueryProps } from "@/@types";
import { PetsRepository } from "@/repositories/pets-repositories";
import { Pet } from "@prisma/client";

interface FetchPetsUseCaseResponse {
    pets: Pet[];
}

export class FetchPetsUseCase {
    constructor(
        private petsRepository: PetsRepository,
    ) {}
  
    async execute({
        city,
        type,
        breed,
        color,
        age,
        weight
    }: FindPetsByQueryProps): Promise<FetchPetsUseCaseResponse> {

        const pets = await this.petsRepository.queryByCharacteristics({
            city,
            type,
            breed,
            color,
            age,
            weight
        });

        return {
            pets
        };
    }
}