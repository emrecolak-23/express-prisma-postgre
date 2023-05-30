import request from "supertest";
import { app } from "../../../app";



it('GET /users/:id should return a user', async () => {
    const token = await auth()

    const responseUsers = await request(app).get('/users').set('Authorization', `Bearer ${token}`).send()
    const id = responseUsers.body[0].id
    const reponseUser = await request(app).get(`/users/${id}`).set('Authorization', `Bearer ${token}`).send()

    expect(reponseUser.status).toBe(200);
});

it('GET /users/:id fails with invalid id', async () => {
    const token = await auth()

    const id = Math.round(Math.random() * 100)
    await request(app).get(`/users/${id}`).set('Authorization', `Bearer ${token}`).send().send().expect(404)
});
