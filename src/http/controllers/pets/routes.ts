import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createPet } from "./create";
import { fetchPetsByCharacteristics } from "./fetch-by-characteristics";
import { getPet } from "./get";
import { fetchPetsByOrg } from "./fetch-by-org";

export async function petsRoutes(app: FastifyInstance){

    app.post("/pets", {onRequest: [verifyJWT]}, createPet)

    app.get("/pets/:id", getPet)    
    app.get("/pets/fetch/:org_id", fetchPetsByOrg)
    app.put("/pets/fetch", fetchPetsByCharacteristics)

}