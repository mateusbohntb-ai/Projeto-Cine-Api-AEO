import assert from "node:assert/strict"
import { afterEach, test } from "node:test"
import request from "supertest"
import app from "../../../app.js"
import repository from "../../../src/repository/ingressos.js"
import service from "../../../src/service/ingressos.js"
import { mockService } from "../helpers.js"

const mocked = mockService(service)
const mockedRepository = mockService(repository)

afterEach(() => {
    mocked.restore()
    mockedRepository.restore()
})

test("GET /api/v1/ingressos/buscar", async () => {
    mocked.set("Buscar", async () => ["ingresso"])
    const response = await request(app).get("/api/v1/ingressos/buscar")
    assert.equal(response.status, 200)
    assert.deepEqual(response.body, { mensage: ["ingresso"] })
})

test("GET /api/v1/ingressos/detalhe/:id", async () => {
    mocked.set("Detalhe", async (id) => ({ id }))
    const response = await request(app).get("/api/v1/ingressos/detalhe/7")
    assert.equal(response.status, 200)
    assert.deepEqual(response.body, { mensage: { id: "7" } })
})

test("POST /api/v1/ingressos/criar aceita disponibilidade false", async () => {
    let receivedAvailability
    mockedRepository.set("Create", async (_filme, _data, _horario, _sala, disponivel) => {
        receivedAvailability = disponivel
    })
    const response = await request(app)
        .post("/api/v1/ingressos/criar")
        .send({ filme: "Filme", data: 20261110, horario: "20:00", sala: 1, disponivel: false })
    assert.equal(response.status, 201)
    assert.equal(receivedAvailability, false)
})

test("PUT /api/v1/ingressos/atualizar/:id envia id ao serviço", async () => {
    let receivedArguments
    mockedRepository.set("Update", async (...args) => { receivedArguments = args })
    const response = await request(app)
        .put("/api/v1/ingressos/atualizar/7")
        .send({ filme: "Filme", data: 20261110, horario: "20:00", sala: 1, disponivel: false })
    assert.equal(response.status, 201)
    assert.deepEqual(receivedArguments, ["7", "Filme", 20261110, "20:00", 1, false])
})

test("DELETE /api/v1/ingressos/deletar/:id", async () => {
    mocked.set("Deletar", async () => undefined)
    const response = await request(app).delete("/api/v1/ingressos/deletar/7")
    assert.equal(response.status, 204)
})