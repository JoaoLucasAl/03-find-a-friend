import { Org, Prisma } from "@prisma/client";
import { OrgsRepository } from "../orgs-repositories";
import { randomUUID } from "node:crypto";

export class InMemoryOrgsRepository implements OrgsRepository{
    
    public orgs: Org[] = [];

    async findById(id: string) {
        return this.orgs.find(org => org.id === id) || null;
    }

    async findByEmail(email: string) {
        return this.orgs.find(org => org.email === email) || null;
    }

    async queryByCity(city: string) {
        return this.orgs.filter(org => org.city === city);
    }

    async register(data: Prisma.OrgCreateInput) {
        const org = {
            id: data.id ?? randomUUID(),
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            city: data.city,
            phone: data.phone,
            created_at: new Date(),
            updated_at: new Date()
        }

        this.orgs.push(org);
        
        return org;
    }

}