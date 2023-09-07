import { prisma } from "@/lib/prisma";
import { OrgsRepository } from "../orgs-repositories";
import { Prisma } from "@prisma/client";

export class PrismaOrgsRepositories implements OrgsRepository {
    async findById(id: string){
        const org = await prisma.org.findUnique({
            where: {
                id,
            },
        });

        return org;
    }

    async findByEmail(email: string){
        const org = await prisma.org.findUnique({
            where: {
                email,
            },
        });

        return org;
    }

    async queryByCity(city: string){
        const orgs = await prisma.org.findMany({
            where: {
                city,
            },
        });

        return orgs;
    }

    async register(data: Prisma.OrgCreateInput){
        const org = await prisma.org.create({
            data,
        });

        return org;
    }
}