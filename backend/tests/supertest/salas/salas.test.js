import assert from "node:assert/strict"
import { afterEach, test } from "node:test"
import request from "supertest"
import app from "../../../app.js"
import repository from "../../../src/repository/salas.js"
import service from "../../../src/service/salas.js"
import { authorizationHeader, mockService } from "../helpers.js"

const mocked = mockService(service)
const mockedRepository = mockService(repository)

afterEach(() => {
    mocked.restore()
    mockedRepository.restore()
})

test("GET /api/v1/salas/buscar", async () => {
    mocked.set("Buscar", async () => ["sala"])
    const response = await request(app).get("/api/v1/salas/buscar")
    assert.equal(response.status, 200)
    assert.deepEqual(response.body, { salas: ["sala"] })
})

test("GET /api/v1/salas/detalhe/:id", async () => {
    mocked.set("Detalhe", async (id) => ({ id }))
    const response = await request(app).get("/api/v1/salas/detalhe/7")
    assert.equal(response.status, 200)
    assert.deepEqual(response.body, { salas: { id: "7" } })
})

test("POST /api/v1/salas/criar aceita disponibilidade false", async () => {
    let receivedAvailability
    mockedRepository.set("Create", async (_filme, _horario, _dia, disponivel) => {
        receivedAvailability = disponivel
    })
    const response = await request(app)
        .post("/api/v1/salas/criar")
        .set("Authorization", authorizationHeader())
        .send({ filme: "Filme", horario: "20:00", dia: "segunda", disponivel: false })
    assert.equal(response.status, 200)
    assert.equal(receivedAvailability, false)
})

test("PUT /api/v1/salas/alterar/:id", async () => {
    mocked.set("Alterar", async () => undefined)
    const response = await request(app)
        .put("/api/v1/salas/alterar/7")
        .set("Authorization", authorizationHeader())
        .send({ filme: "Filme", horario: "20:00", dia: "segunda", disponivel: false })
    assert.equal(response.status, 200)
})

test("DELETE /api/v1/salas/deletar/:id", async () => {
    mocked.set("Deletar", async () => undefined)
    const response = await request(app)
        .delete("/api/v1/salas/deletar/7")
        .set("Authorization", authorizationHeader())
    assert.equal(response.status, 200)
})