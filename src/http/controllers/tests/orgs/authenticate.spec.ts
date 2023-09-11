import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Authenticate (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to authenticate', async () => {
        
        await request(app.server)
            .post('/orgs')
            .send({
                name: "Org",
                email: "myorg@example.com",
                city: "City",
                phone: "31998667777",
                password: '123456',
            })
        
        const response = await request(app.server)
            .post('/sessions')
            .send({
                email: "myorg@example.com",
                password: '123456',
            })

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            token: expect.any(String),
        })
    });
        
})