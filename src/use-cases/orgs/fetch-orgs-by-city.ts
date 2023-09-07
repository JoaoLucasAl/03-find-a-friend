import { OrgsRepository } from "@/repositories/orgs-repositories";
import { Org } from "@prisma/client";

interface FetchOrgsUseCaseRequest {
    city: string;
}

interface FetchOrgsUseCaseResponse {
    orgs: Org[];
}

export class FetchOrgsByCityUseCase {
    constructor(
        private orgsRepository: OrgsRepository,
    ) {}
  
    async execute({
        city,
    }: FetchOrgsUseCaseRequest): Promise<FetchOrgsUseCaseResponse> {

        const orgs = await this.orgsRepository.queryByCity(city);

        return {
            orgs
        };
    }
}