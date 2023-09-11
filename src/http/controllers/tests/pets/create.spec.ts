import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Create Pet (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a pet', async () => {
        
        await request(app.server)
            .post('/orgs')
            .send({
                name: "Org",
                email: "myorg@example.com",
                city: "City",
                phone: "31998667777",
                password: '123456',
            })
        
        const { token } = (await request(app.server)
        .post('/sessions')
        .send({
            email: "myorg@example.com",
            password: '123456',
        })).body

        const response = await request(app.server)
            .post('/pets')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "My Pet",
                type: "dog",
                breed: "breed",
                color: "color",
                age: 1,
                weight: 1,
            })
            
        expect(response.status).toEqual(201);
    });
        
})