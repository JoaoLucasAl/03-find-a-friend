import { randomUUID } from "node:crypto";
import { PetsRepository } from "../pets-repositories";
import { Org, Pet, Prisma } from "@prisma/client";
import { FindPetsByQueryProps } from "@/@types";

export class InMemoryPetsRepository implements PetsRepository {
    public pets: Pet[] = [];
    public orgs: Org[] = [];

    async findById(id: string) {
        return this.pets.find(pet => pet.id === id) || null;
    }

    async queryByCharacteristics(query: FindPetsByQueryProps) {
        const { city, type, breed, color, age, weight } = query;
        const myCityOrgs = this.orgs.filter(org => org.city === city);
        let queryPets = this.pets.filter(pet => myCityOrgs.some(org => org.id === pet.org_id));
        if (type) queryPets = queryPets.filter(pet => pet.type === type);
        if (breed) queryPets = queryPets.filter(pet => pet.breed === breed);
        if (color) queryPets = queryPets.filter(pet => pet.color === color);
        if (age) queryPets = queryPets.filter(pet => pet.age === age);
        if (weight) queryPets = queryPets.filter(pet => pet.weight === weight);
        return queryPets;

    }
    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = {
            id: data.id ?? randomUUID(),
            name: data.name,
            type: data.type,
            breed: data.breed,
            color: data.color,
            age: data.age,
            weight: data.weight,
            org_id: data.org_id,
            description: data.description ?? null,
            created_at: new Date(),
            updated_at: new Date()
        }

        this.pets.push(pet);
        
        return pet;
    }
}