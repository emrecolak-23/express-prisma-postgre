import request from "supertest";
import { app } from "../../../app";

it('DELETE /users should delete user', async () => {

    const token = await auth()

    const response = await request(app).post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
            email: "test@gmail.com",
            firstname: "Emre",
            lastName: "ÇOLAK",
            social: {}
        }).expect(201)

    const deletedResponse = await request(app)
        .delete(`/users/${response.body.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send()
    expect(deletedResponse.status).toBe(200);

})