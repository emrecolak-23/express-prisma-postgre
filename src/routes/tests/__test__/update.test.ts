import request from 'supertest'
import { app } from '../../../app'

it('/courses/:courseId/tests/:testId should update test', async () => {
    const token = await auth()

    const courseResponse = await request(app)
        .post('/courses')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'Test Course',
            courseDetails: 'Test course details'
        }).expect(201)

    const testResponse = await request(app)
        .post(`/courses/${courseResponse.body.id}/tests`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'First Test',
            date: '2023-06-31'
        }).expect(201)

    await request(app)
        .put(`/courses/${courseResponse.body.id}/tests/${testResponse.body.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'First Test',
            date: '2023-07-31'
        }).expect(200)

    await request(app)
        .delete(`/courses/${courseResponse.body.id}/tests/${testResponse.body.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send()
        .expect(204)

    await request(app)
        .delete(`/courses/${courseResponse.body.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send()
        .expect(204)

})