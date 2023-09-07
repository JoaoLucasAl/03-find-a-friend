import { PetsRepository } from "@/repositories/pets-repositories";
import { Pet } from "@prisma/client";

interface FetchPetsByOrgIdCaseRequest {
    orgId: string;
}

interface FetchPetsByOrgIdCaseResponse {
    pets: Pet[];
}

export class FetchPetsByOrgIdUseCase {
    constructor(
        private petsRepository: PetsRepository,
    ) {}
  
    async execute({
        orgId   
    }: FetchPetsByOrgIdCaseRequest): Promise<FetchPetsByOrgIdCaseResponse> {

        const pets = await this.petsRepository.queryByOrgId(orgId);

        return {
            pets
        };
    }
}