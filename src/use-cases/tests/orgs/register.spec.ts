import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repositories";
import { RegisterOrgUseCase } from "@/use-cases/orgs/register";
import { describe, it, beforeEach, expect } from "vitest";

let orgsRepository: InMemoryOrgsRepository;
let sut: RegisterOrgUseCase;

describe("Register Org Use Case", () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository();
        sut = new RegisterOrgUseCase(orgsRepository);
    })

    it("should be able to register a new org", async () => {
        const { org } = await sut.execute({
            name: "Org",
            email: "myorg@gmail.com",
            city: "Ouro Preto",
            phone: "31999999999",
            password: "123456",
        });

        expect(org.id).toEqual(expect.any(String));
    })
})