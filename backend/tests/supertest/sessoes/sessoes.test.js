import assert from "node:assert/strict"
import { afterEach, test } from "node:test"
import request from "supertest"
import app from "../../../app.js"
import service from "../../../src/service/sessoes.js"
import { mockService } from "../helpers.js"

const mocked = mockService(service)

afterEach(() => mocked.restore())

test("GET /api/v1/sessoes/buscar", async () => {
    mocked.set("Buscar", async () => ["sessao"])
    const response = await request(app).get("/api/v1/sessoes/buscar")
    assert.equal(response.status, 200)
    assert.deepEqual(response.body, { mensagem: ["sessao"] })
})

test("GET /api/v1/sessoes/detalhe/:id", async () => {
    mocked.set("Detalhe", async (id) => ({ id }))
    const response = await request(app).get("/api/v1/sessoes/detalhe/7")
    assert.equal(response.status, 200)
    assert.deepEqual(response.body, { mensagem: { id: "7" } })
})

test("POST /api/v1/sessoes/criar", async () => {
    mocked.set("Criar", async () => undefined)
    const response = await request(app)
        .post("/api/v1/sessoes/criar")
        .send({ titulo: "Filme", sala: 1, dia: 10, horario: "20:00" })
    assert.equal(response.status, 201)
})

test("PUT /api/v1/sessoes/alterar/:id", async () => {
    mocked.set("Alterar", async () => undefined)
    const response = await request(app)
        .put("/api/v1/sessoes/alterar/7")
        .send({ titulo: "Filme", sala: 1, dia: 10, horario: "20:00" })
    assert.equal(response.status, 201)
})

test("DELETE /api/v1/sessoes/deletar/:id", async () => {
    mocked.set("Deletar", async () => undefined)
    const response = await request(app).delete("/api/v1/sessoes/deletar/7")
    assert.equal(response.status, 204)
})