import request from "supertest";
import { app } from "../../../app";


it('GET /users should return a list of users', async () => {
    const response = await request(app).get('/users').send()
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
});