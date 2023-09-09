import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repositories";
import { GetPetUseCase } from "@/use-cases/pets/get-pet";

let petsRepository: InMemoryPetsRepository;
let sut: GetPetUseCase;

describe("Get Pet Use Case", () => {
    beforeEach(() => {
        petsRepository = new InMemoryPetsRepository();
        sut = new GetPetUseCase(petsRepository);
    })

    it("should be able to get a pet", async () => {

        const createdPet = await petsRepository.create({
            name: "Pet",
            age: 1,
            type: "dog",
            breed: "breed",
            color: "color",
            weight: 1,
            org_id: "org-id",
        })

        const { pet } = await sut.execute({petId: createdPet.id});

        expect(pet.id).toEqual(expect.any(String));
        expect(pet.name).toEqual("Pet");
        })

        it("should not be able to get a pet with the wrong id", async () => {

            expect(() => sut.execute({
                petId: "wrong-id"
            })).rejects.toBeInstanceOf(ResourceNotFoundError);
    
        });
        
    }) 
