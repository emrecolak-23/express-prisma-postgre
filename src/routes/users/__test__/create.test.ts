import request from "supertest";
import { app } from "../../../app";


it('POST /users should create a user', async () => {
    const response = await request(app).post('/users').send({
        email: "test@gmail.com",
        firstname: "Emre",
        lastName: "ÇOLAK",
        social: {}
    })
    expect(response.status).toBe(201);
    const deletedResponse = await request(app).delete(`/users/${response.body.id}`).send()
    expect(deletedResponse.status).toBe(200)
});

it('POST /users fails with invalid input', async () => {
    await request(app).post('/users').send({
        firstnam: 'Emre',
        lastName: 'ÇOLAK',
        social: {}
    }).expect(400)
})