import request from "supertest";
import { app } from "../../../app";

it('GET /users/:id should return a user', async () => {
    const responseUsers = await request(app).get('/users').send()
    const id = responseUsers.body[0].id

    const reponseUser = await request(app).get(`/users/${id}`).send()

    expect(reponseUser.status).toBe(200);
    expect(reponseUser.body.id).toEqual(8)
});

it('GET /users/:id fails with invalid id', async () => {
    const id = Math.round(Math.random() * 100)
    console.log(id)
    await request(app).get(`/users/${id}`).send().expect(404)
});