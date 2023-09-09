import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repositories";
import { hash } from "bcryptjs";
import { GetOrgUseCase } from "@/use-cases/orgs/get-org";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

let orgsRepository: InMemoryOrgsRepository;
let sut: GetOrgUseCase;

describe("Get Org Use Case", () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository();
        sut = new GetOrgUseCase(orgsRepository);
    })

    it("should be able to get a org", async () => {
        const createdOrg = await orgsRepository.register({
            name: "Org",
            email: "myorg@gmail.com",
            city: "Ouro Preto",
            phone: "31999999999",
            password_hash: await hash("123456", 6),
        });

        const { org } = await sut.execute({orgId: createdOrg.id});

        expect(org.id).toEqual(expect.any(String));
        expect(org.name).toEqual("Org");
        })

        it("should not be able to get a org with the wrong id", async () => {

            expect(() => sut.execute({
                orgId: "wrong-id"
            })).rejects.toBeInstanceOf(ResourceNotFoundError);
    
        });
        
    }) 
