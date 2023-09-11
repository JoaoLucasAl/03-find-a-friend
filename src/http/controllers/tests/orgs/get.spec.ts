import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { randomUUID } from 'node:crypto';

describe('Get a Org (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get a org by ID', async () => {

        const id = randomUUID()

        await prisma.org.create({
            data: {
                id: id,
                name: "My Org",
                email: "myorg@example.com",
                city: "City 1",
                phone: "31998667777",
                password_hash: await hash('123456', 8),
            }
        })

        const response = await request(app.server)
            .get(`/orgs/${id}`)

        expect(response.status).toEqual(200)
        expect(response.body.org).toEqual(expect.objectContaining({
            name: "My Org"
        }))
        
        
    })

})