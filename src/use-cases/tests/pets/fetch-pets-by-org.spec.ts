import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repositories";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repositories";
import { FetchOrgsByCityUseCase } from "@/use-cases/orgs/fetch-orgs-by-city";
import { FetchPetsByOrgIdUseCase } from "@/use-cases/pets/fetch-pets-by-org";
import { hash } from "bcryptjs";
import { describe, it, beforeEach, expect } from "vitest";

let petsRepository: InMemoryPetsRepository;
let sut: FetchPetsByOrgIdUseCase;


describe("Fetch Pets By Org Use Case", () => {
    beforeEach( async () => {
        petsRepository = new InMemoryPetsRepository();
        sut = new FetchPetsByOrgIdUseCase(petsRepository);

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

    it("should be able to fetch pets by org id", async () => {
        const { pets } = await sut.execute({
            orgId: "org-id",
        });

        expect(pets).toHaveLength(1);
        expect(pets).toEqual([expect.objectContaining({name: "Pet"})]);
    })
    
    it("should return an empty array if you fetch pets by characteristics with the wrong city", async () => {

        expect(() => sut.execute({
            orgId: "wrong-id",
        })).toHaveLength(0);
    
    })

}) 
