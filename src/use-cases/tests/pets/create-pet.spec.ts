import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repositories";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repositories";
import { CreatePetUseCase } from "@/use-cases/pets/create-pet";
import { hash } from "bcryptjs";
import { describe, it, beforeEach, expect } from "vitest";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: CreatePetUseCase;

describe("Create Pet Use Case", () => {
    beforeEach( async () => {
        orgsRepository = new InMemoryOrgsRepository();
        petsRepository = new InMemoryPetsRepository();
        sut = new CreatePetUseCase(petsRepository, orgsRepository);
    })

    it("should be able to create a new pet", async () => {

        const org = await orgsRepository.register({
            name: "Org",
            email: "myorg@gmail.com",
            city: "Ouro Preto",
            phone: "31999999999",
            password_hash: await hash("123456", 6),
        });
        
        const { pet } = await sut.execute({
            name: "Pet",
            age: 1,
            type: "dog",
            breed: "breed",
            color: "color",
            weight: 1,
            orgId: org.id,
    })

        expect(pet.id).toEqual(expect.any(String));

    })

    it("should not be able to create a new pet with the wrong org id", async () => {

        expect(() => sut.execute({
            name: "Pet",
            age: 1,
            type: "dog",
            breed: "breed",
            color: "color",
            weight: 1,
            orgId: "wrong-id",
        })).rejects.toBeInstanceOf(Error);

    })

})