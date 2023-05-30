import request from "supertest";
import { app } from "../../../app";


it('GET /users should return a list of users', async () => {
    const token = await auth()
    const response = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`)
        .send()
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
});