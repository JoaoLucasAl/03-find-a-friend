import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { randomUUID } from 'node:crypto';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

describe('Fetch Pets by Characteristics (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to fetch pets by characteristics', async () => {
        
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


        await prisma.pet.createMany({
            data: [{
                id: randomUUID(),
                name: "My Pet 1",
                type: "dog",
                breed: "breed",
                color: "color",
                age: 1,
                weight: 1,
                org_id: orgId,
            },
            {
                id: randomUUID(),
                name: "My Pet 2",
                type: "dog",
                breed: "breed",
                color: "color",
                age: 2,
                weight: 2,
                org_id: orgId,
            },
            {
                id: randomUUID(),
                name: "My Pet 3",
                type: "cat",
                breed: "breed",
                color: "color",
                age: 1,
                weight: 1,
                org_id: orgId,
            }]
        })

        const queryParams = "?city=City 1&type=dog"
        const response = await request(app.server)
            .get(`/pets/fetch${queryParams}`)


        expect(response.status).toEqual(200)
        expect(response.body.pets).toHaveLength(2)
        expect(response.body.pets).toEqual([
                expect.objectContaining({
                    name: "My Pet 1"
                }),
                expect.objectContaining({
                    name: "My Pet 2"
                })
            ])
        });
        
})