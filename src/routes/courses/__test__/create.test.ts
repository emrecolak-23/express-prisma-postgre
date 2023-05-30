import request from "supertest";
import { app } from "../../../app";

it('POST /courses should create a course', async () => {
    const token = await auth()

    const response = await request(app)
        .post('/courses')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'Test Course',
            courseDetails: 'Test course details'
        }).expect(201)



    await request(app)
        .delete(`/courses/${response.body.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send()
        .expect(204)

})

it('POST /courses fails with invalid input', async () => {
    const token = await auth()

    const response = await request(app)
        .post('/courses')
        .set('Authorization', `Bearer ${token}`)
        .send({
            courseDetails: 'Test course detail'
        }).expect(400)

})