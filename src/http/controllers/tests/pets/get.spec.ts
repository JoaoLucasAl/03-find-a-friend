import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { randomUUID } from 'node:crypto';

describe('Get a Pet (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get a org by ID', async () => {

        const orgId = randomUUID()

        await prisma.org.create({
            data: {
                id: orgId,
                name: "My Org",
                email: "myorg@example.com",
                city: "City 1",
                phone: "31998667777",
                password_hash: await hash('123456', 8),
            }
        })

        const petId = randomUUID()

        await prisma.pet.create({
            data: {
                id: petId,
                name: "My Pet",
                type: "dog",
                breed: "breed",
                color: "color",
                age: 1,
                weight: 1,
                org_id: orgId,
            }
        })

        const response = await request(app.server)
            .get(`/pets/${petId}`)


        expect(response.status).toEqual(200)
        expect(response.body.pet).toEqual(expect.objectContaining({
            name: "My Pet"
        }))
        
        
    })

})