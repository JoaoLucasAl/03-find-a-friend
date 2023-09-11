import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Register (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to register', async () => {
        const response = await request(app.server)
            .post('/orgs')
            .send({
                name: "Org",
                email: "myorg@example.com",
                city: "City",
                phone: "31998667777",
                password: '123456',
            })

            expect(response.status).toEqual(201);
        });
        
})