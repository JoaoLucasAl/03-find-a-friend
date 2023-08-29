import { Org, Prisma } from "@prisma/client";
import { OrgsRepository } from "../orgs-repositories";
import { randomUUID } from "crypto";

export class InMemoryOrgsRepository implements OrgsRepository{
    
    public orgs: Org[] = [];

    async findById(id: string) {
        return this.orgs.find(org => org.id === id) || null;
    }

    async queryByCity(city: string) {
        return this.orgs.filter(org => org.city === city);
    }

    async create(data: Prisma.OrgCreateInput) {
        const org = {
            id: data.id ?? randomUUID(),
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            city: data.city,
            phone: data.phone,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        this.orgs.push(org);
        
        return org;
    }

}