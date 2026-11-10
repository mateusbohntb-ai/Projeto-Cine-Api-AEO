import assert from "node:assert/strict"
import { afterEach, test } from "node:test"
import request from "supertest"
import app from "../../../app.js"
import service from "../../../src/service/filmes.js"
import { authorizationHeader, mockService } from "../helpers.js"

const mocked = mockService(service)

afterEach(() => mocked.restore())

test("GET /api/v1/filmes/buscar", async () => {
    mocked.set("Buscar", async () => ["filme"])
    const response = await request(app).get("/api/v1/filmes/buscar")
    assert.equal(response.status, 200)
    assert.deepEqual(response.body, { filmes: ["filme"] })
})

test("GET /api/v1/filmes/detalhe/:id", async () => {
    mocked.set("Detalhe", async (id) => ({ id }))
    const response = await request(app).get("/api/v1/filmes/detalhe/7")
    assert.equal(response.status, 200)
    assert.deepEqual(response.body, { filmes: { id: "7" } })
})

test("POST /api/v1/filmes/criar", async () => {
    mocked.set("Criar", async () => undefined)
    const response = await request(app)
        .post("/api/v1/filmes/criar")
        .set("Authorization", authorizationHeader())
        .send({ titulo: "Filme", horario: "20:00", dia: "segunda" })
    assert.equal(response.status, 200)
    assert.equal(response.body.message, "Cadastrado com sucesso")
})

test("POST /api/v1/filmes/criar sem token é rejeitado", async () => {
    const response = await request(app)
        .post("/api/v1/filmes/criar")
        .send({ titulo: "Filme", horario: "20:00", dia: "segunda" })
    assert.equal(response.status, 401)
})

test("PUT /api/v1/filmes/alterar/:id", async () => {
    mocked.set("Alterar", async () => undefined)
    const response = await request(app)
        .put("/api/v1/filmes/alterar/7")
        .set("Authorization", authorizationHeader())
        .send({ titulo: "Filme", horario: "20:00", dia: "segunda" })
    assert.equal(response.status, 200)
})

test("DELETE /api/v1/filmes/deletar/:id", async () => {
    mocked.set("Deletar", async () => undefined)
    const response = await request(app)
        .delete("/api/v1/filmes/deletar/7")
        .set("Authorization", authorizationHeader())
    assert.equal(response.status, 200)
})