import request from 'supertest'
import { app } from '../../../app'

it('GET /courses/:id should return a user', async () => {
    const token = await auth()

    const response = await request(app)
        .post('/courses')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'Test Course',
            courseDetails: 'Test course details'
        }).expect(201)

    const courseResponse = await request(app)
        .get(`/courses/${response.body.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send()
        .expect(200)

    expect(response.body.name).toEqual(courseResponse.body.name)

    await request(app)
        .delete(`/courses/${response.body.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send()
        .expect(204)

})

it('GET /courses/:id fails with invalid id', async () => {
    const token = await auth()

    const id = Math.round(Math.random() * 100)

    await request(app)
        .get(`/courses/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send()
        .expect(404)

})