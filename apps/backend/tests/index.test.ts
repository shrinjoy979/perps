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

            expect().fail();
        } catch(e) {

            if (e instanceof AxiosError) {
                expect(e.response?.status).toBe(411);
            } else {
                expect().fail();
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

    it("Signin doesn't work if username is incorrect", async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                password: "123456"
            })

            expect().fail();
        } catch(e) {

            if (e instanceof AxiosError) {
                expect(e.response?.status).toBe(411);
            } else {
                expect().fail();
            }
        }
    })

    it("Signin work if wrog credentials are sent", async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                username,
                password: "123456random"
            })

            expect().fail();
        } catch(e: any) {
            expect(e.status).toBe(403);
        }
    })

    it("Signin does work if username is provided", async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username,
            password: "123456"
        })

        expect(response.status).toBe(200);
        expect(response.data.token).not.toBe(undefined);
    })
})
