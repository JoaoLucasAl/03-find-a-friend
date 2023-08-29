import { prisma } from "@/lib/prisma";
import { PetsRepository } from "../pets-repositories";
import { FindPetsByQueryProps } from "@/@types";
import { Prisma } from "@prisma/client";

export class PrismaPetsRepository implements PetsRepository {
    async findById(id: string){
        const pet = await prisma.pet.findUnique({
            where: {
                id,
            },
        });

        return pet;
    }

    async queryByCharacteristics(query: FindPetsByQueryProps){
        const { city, type, breed, color, age, weight } = query;

        const pets = await prisma.pet.findMany({
            where: {
                Org: {
                    city,
                },
                type,
                breed,
                color,
                age,
                weight,
            },
        });

        return pets;
    }

    async create(data: Prisma.PetUncheckedCreateInput){
        const pet = await prisma.pet.create({
            data,
        });

        return pet;
    }
}