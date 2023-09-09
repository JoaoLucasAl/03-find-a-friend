import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repositories";
import { FetchPetsByCharacteristicsUseCase } from "@/use-cases/pets/fetch-pets-by-characteristics";
import { hash } from "bcryptjs";
import { describe, it, beforeEach, expect } from "vitest";

let petsRepository: InMemoryPetsRepository;
let sut: FetchPetsByCharacteristicsUseCase;


describe("Fetch Pets By Characteristics Use Case", () => {
    beforeEach( async () => {
        petsRepository = new InMemoryPetsRepository();
        sut = new FetchPetsByCharacteristicsUseCase(petsRepository);

        petsRepository.orgs.push({
            id: "org-id",
            name: "Org",
            email: "myorg@gmail.com",
            city: "Ouro Preto",
            phone: "31999999999",
            password_hash: await hash("123456", 6),
            created_at: new Date(),
            updated_at: new Date(),
        });
        
        await petsRepository.create({
            name: "Pet",
            age: 1,
            type: "dog",
            breed: "breed",
            color: "color",
            weight: 1,
            org_id: "org-id",
     })
    })

    it("should be able to fetch pets by characteristics", async () => {
        const { pets } = await sut.execute({
            city: "Ouro Preto",
            type: "dog",
            breed: "breed",
            color: "color",
            weight: 1,
        });

        expect(pets).toHaveLength(1);
        expect(pets).toEqual([expect.objectContaining({name: "Pet"})]);
    })
    
    it("should return an empty array if you fetch pets by characteristics with the wrong city", async () => {

        expect(() => sut.execute({
            city: "wrong-city",
            type: "dog",
            breed: "breed",
            color: "color",
            weight: 1,
        })).toHaveLength(0);
    
    })

}) 
