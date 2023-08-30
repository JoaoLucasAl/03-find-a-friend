import { OrgsRepository } from "@/repositories/orgs-repositories";
import { PetsRepository } from "@/repositories/pets-repositories";
import { OrgNotFoundError } from "./errors/org-not-found-error";
import { Pet } from "@prisma/client";

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
            throw new OrgNotFoundError(orgId);
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