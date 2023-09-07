import { FindPetsByQueryProps } from "@/@types";
import { PetsRepository } from "@/repositories/pets-repositories";
import { Pet } from "@prisma/client";

interface FetchPetsByCharacteristicsCaseResponse {
    pets: Pet[];
}

export class FetchPetsByCharacteristicsUseCase {
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
    }: FindPetsByQueryProps): Promise<FetchPetsByCharacteristicsCaseResponse> {

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