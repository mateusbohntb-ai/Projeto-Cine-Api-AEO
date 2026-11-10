import jwt from "jsonwebtoken"

export function mockService(service) {
    const originalMethods = { ...service }

    return {
        set(method, implementation) {
            service[method] = implementation
        },
        restore() {
            Object.assign(service, originalMethods)
        }
    }
}

export function authorizationHeader() {
    const secret = "supertest-test-secret"
    process.env.JWT_SECRET = secret
    return `Bearer ${jwt.sign({ id: 1 }, secret)}`
}