import { Org } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { OrgsRepository } from "@/repositories/orgs-repositories";

interface GetOrgUseCaseRequest {
    orgId: string;
}

interface GetOrgUseCaseResponse {
    org: Org;

}

export class GetOrgUseCase {
    constructor(
        private orgsRepository: OrgsRepository,
    ) { }

    async execute({ orgId }: GetOrgUseCaseRequest): Promise<GetOrgUseCaseResponse> {
        const org = await this.orgsRepository.findById(orgId);

        if (!org) {
            throw new ResourceNotFoundError(orgId, "Org");
        }

        return {
            org
        };
    }
}