import { OrgsRepository } from "@/repositories/orgs-repositories";
import { Org } from "@prisma/client";
import { hash } from "bcryptjs";
import { OrgAlreadyExistsError } from "../errors/org-already-exists-error";

interface RegisterOrgUseCaseRequest {
    name: string;
    email: string;
    city: string;
    phone: string;
    password: string;
}

interface RegisterOrgUseCaseResponse {
    org: Org;
}

export class RegisterOrgUseCase {
    constructor(private orgsRepository: OrgsRepository) {}

    async execute({
        name,
        email,
        city,
        phone,
        password
    }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {

        const password_hash = await hash(password, 6);

        const orgWithSameEmail = await this.orgsRepository.findByEmail(email);

        if(orgWithSameEmail){
            throw new OrgAlreadyExistsError();
        }

        const org = await this.orgsRepository.register({
            name,
            email,
            city,
            phone,
            password_hash
        });

        return { org };
    }

}