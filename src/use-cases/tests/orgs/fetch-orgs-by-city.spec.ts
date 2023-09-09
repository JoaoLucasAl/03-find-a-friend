import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repositories";
import { FetchOrgsByCityUseCase } from "@/use-cases/orgs/fetch-orgs-by-city";
import { hash } from "bcryptjs";

let orgsRepository: InMemoryOrgsRepository;
let sut: FetchOrgsByCityUseCase;

describe("Fetch Org By City Use Case", () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository();
        sut = new FetchOrgsByCityUseCase(orgsRepository);
    })

    it("should be able to fetch orgs by city", async () => {
        await orgsRepository.register({
            name: "Org",
            email: "myorg@gmail.com",
            city: "Ouro Preto",
            phone: "31999999999",
            password_hash: await hash("123456", 6),
        });

        const { orgs } = await sut.execute({city: "Ouro Preto"});

        expect(orgs).toHaveLength(1);
        expect(orgs).toEqual([expect.objectContaining({name: "Org"})]);
        })
        
    }) 
