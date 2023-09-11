import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Fetch Orgs by City (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to fetch orgs by city', async () => {

        await request(app.server)
        .post('/orgs')
        .send({
            name: "My Org",
            email: "myorg@example.com",
            city: "City 1",
            phone: "31998667777",
            password: '123456',
        })


        await request(app.server)
        .post('/orgs')
        .send({
            name: "Your Org",
            email: "yourorg@example.com",
            city: "City2",
            phone: "31998667778",
            password: '123456',
        })

        const params = "City 1"
        const response = await request(app.server)
            .get(`/orgs/city/${params}`)


        expect(response.status).toEqual(200)
        expect(response.body.orgs).toHaveLength(1)
        expect(response.body.orgs).toEqual([
                expect.objectContaining({
                    name: "My Org"
                })
            ])
        });
        
})