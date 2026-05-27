import axios, { AxiosError } from "axios";
import { describe, expect, it } from "bun:test";
import { BACKEND_URL } from "./config";
// unit tests VS integration tests

describe("auth endpoints", () => {
    const username = `harkirat + ${Math.random()}`;
    it("Signup doesn't work if username is incorrect", async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                password: "123456"
            })

            expect(1).toBe(411);
        } catch(e) {

            if (e instanceof AxiosError) {
                expect(e.response?.status).toBe(411);
            } else {
                expect(1).toBe(2);
            }
        }
    })

    it("Signup does work if username is incorrect", async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password: "123456"
        })

        expect(response.data.id).not.toBe(undefined);
    })
})
