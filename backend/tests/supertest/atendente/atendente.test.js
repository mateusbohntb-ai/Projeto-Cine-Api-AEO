import assert from "node:assert/strict"
import { afterEach, test } from "node:test"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import request from "supertest"
import app from "../../../app.js"
import repository from "../../../src/repository/atendente.js"
import service from "../../../src/service/atendente.js"
import { authorizationHeader, mockService } from "../helpers.js"

const mocked = mockService(service)
const mockedRepository = mockService(repository)

afterEach(() => {
    mocked.restore()
    mockedRepository.restore()
})

test("GET /api/v1/atendente/Buscar", async () => {
    mocked.set("Buscar", async () => ["atendente"])
    const response = await request(app).get("/api/v1/atendente/Buscar")
    assert.equal(response.status, 200)
    assert.deepEqual(response.body, { mensagem: ["atendente"] })
})

test("GET /api/v1/atendente/Detalhes/:id", async () => {
    mocked.set("Detalhe", async (id) => ({ id }))
    const response = await request(app).get("/api/v1/atendente/Detalhes/7")
    assert.equal(response.status, 200)
    assert.deepEqual(response.body, { mensagem: { id: "7" } })
})

test("POST /api/v1/atendente/Login não exige token e retorna JWT", async () => {
    const secret = "atendente-test-secret"
    const passwordHash = await bcrypt.hash("senha", 4)
    process.env.JWT_SECRET = secret
    mockedRepository.set("FindByEmail", async (email) => ({
        id: 8,
        email,
        senha: passwordHash
    }))
    const response = await request(app)
        .post("/api/v1/atendente/Login")
        .send({ email: "cine@example.com", senha: "senha" })
    assert.equal(response.status, 200)
    assert.equal(jwt.verify(response.body.token, secret).id, 8)
})

test("POST /api/v1/atendente/Criar", async () => {
    let receivedArguments
    mockedRepository.set("Create", async (...args) => { receivedArguments = args })
    const response = await request(app)
        .post("/api/v1/atendente/Criar")
        .send({ email: "cine@example.com", senha: "senha", telefone: "123", setor: "venda de ingressos" })
    assert.equal(response.status, 201)
    assert.equal(response.body.mensagem, "Cadastrado com sucesso")
    assert.deepEqual([receivedArguments[0], receivedArguments[2], receivedArguments[3]], [
        "cine@example.com",
        "123",
        "venda de ingressos"
    ])
    assert.equal(await bcrypt.compare("senha", receivedArguments[1]), true)
})

test("PUT /api/v1/atendente/Alterar/:id exige autenticação", async () => {
    let receivedArguments
    mockedRepository.set("Update", async (...args) => { receivedArguments = args })
    const response = await request(app)
        .put("/api/v1/atendente/Alterar/7")
        .set("Authorization", authorizationHeader())
        .send({ email: "cine@example.com", telefone: "123", setor: "venda de ingressos" })
    assert.equal(response.status, 201)
    assert.deepEqual(receivedArguments, [7, "cine@example.com", undefined, "123", "venda de ingressos"])
})

test("DELETE /api/v1/atendente/Deletar/:id exige autenticação", async () => {
    mocked.set("Deletar", async () => undefined)
    const response = await request(app)
        .delete("/api/v1/atendente/Deletar/7")
        .set("Authorization", authorizationHeader())
    assert.equal(response.status, 204)
})