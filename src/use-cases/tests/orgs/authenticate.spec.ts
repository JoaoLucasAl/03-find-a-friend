import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repositories";
import { AuthenticateUseCase } from "@/use-cases/orgs/authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";

let orgsRepository: InMemoryOrgsRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository();
        sut = new AuthenticateUseCase(orgsRepository);
    })

    it("should be able to authenticate", async () => {
        await orgsRepository.register({
            name: "Org",
            email: "myorg@gmail.com",
            city: "Ouro Preto",
            phone: "31999999999",
            password_hash: await hash("123456", 6),
        });

        const { org } = await sut.execute({
            email: "myorg@gmail.com",
            password: "123456",
        })

        expect(org.id).toEqual(expect.any(String));
        })
        
        it("should not be able to authenticate with wrong email", async () => {

            expect(() => sut.execute({
                email: "johndoe@example.com",
                password: "123456"
            })).rejects.toBeInstanceOf(InvalidCredentialsError);
    
        });
    
        it("should not be able to authenticate with wrong passwrod", async () => {
    
            await orgsRepository.register({
                name: "Org",
                email: "myorg@gmail.com",
                city: "Ouro Preto",
                phone: "31999999999",
                password_hash: await hash("123456", 6),
            });
    
            expect(() => sut.execute({
                email: "myorg@gmail.com",
                password: "123123"
            })).rejects.toBeInstanceOf(InvalidCredentialsError);
    
        });
    }) 
