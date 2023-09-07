import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { refresh } from "./refresh";
import { getOrg } from "./get";
import { fetchOrgsByCity } from "./fetch-by-city";

export async function orgsRoutes(app: FastifyInstance){

    app.get('/orgs/:id', getOrg)
    app.get('/orgs/city/:city', fetchOrgsByCity)

    app.post('/orgs', register)
    app.post('/sessions', authenticate)

    app.patch('/token/refresh', refresh)


}