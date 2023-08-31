import { OrgsRepository } from "@/repositories/orgs-repositories";
import { PetsRepository } from "@/repositories/pets-repositories";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface CreatePetUseCaseRequest {
    name: string;
    type: string;
    breed: string;
    color: string;
    age: number;
    weight: number;
    orgId: string;
    description?: string;
}

interface CreatePetUseCaseResponse {
    pet: Pet;
}

export class CreatePetUseCase {
    constructor(
        private petsRepository: PetsRepository,
        private orgsRepository: OrgsRepository
    ) {}

    async execute({
        name,
        type,
        breed,
        color,
        age,
        weight,
        orgId,
        description
    }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
        const org = await this.orgsRepository.findById(orgId);

        if (!org) {
            throw new ResourceNotFoundError(orgId, "Org");
        }

        const pet = await this.petsRepository.create({
            name,
            type,
            breed,
            color,
            age,
            weight,
            org_id: orgId,
            description
        });

        return {
            pet
        };
    }
}