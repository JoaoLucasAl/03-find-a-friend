import { FindPetsByQueryProps } from "@/@types";
import { Pet, Prisma } from "@prisma/client";


export interface PetsRepository {
    findById(id: string): Promise<Pet | null>;
    queryByCharacteristics(query: FindPetsByQueryProps): Promise<Pet[]>;
    create(pet: Prisma.PetCreateInput): Promise<Pet>;
}