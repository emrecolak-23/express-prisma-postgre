import request from 'supertest'
import { app } from '../../../app'

it('GET /courses should return a list of courses', async () => {
    const token = await auth()

    const response = await request(app)
        .post('/courses')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'Test Course',
            courseDetails: 'Test course details'
        }).expect(201)

    const coursesResponse = await request(app)
        .get('/courses')
        .set('Authorization', `Bearer ${token}`)
        .send()
        .expect(200)

    expect(coursesResponse.body.length).toBeGreaterThan(0);

    await request(app)
        .delete(`/courses/${response.body.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send()
        .expect(204)


})