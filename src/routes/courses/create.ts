import express, { Request, Response } from 'express'
import prisma from '../../client'
import { CourseInputDto } from '../../dtos/course-input-dto'
import requireAuth from '../../middlewares/require-auth'
import validate from '../../middlewares/validate'
import { inputCourseValidation } from '../../validations/courses'
const router = express.Router()

router.post('/courses', requireAuth, validate(inputCourseValidation), async (req: Request, res: Response) => {

    const courseInput = req.body as CourseInputDto

    const userId = req.currentUser?.id

    const course = await prisma.course.create({
        data: {
            name: courseInput.name,
            courseDetails: courseInput.courseDetails,
            members: {
                create: {
                    role: 'TEACHER',
                    user: {
                        connect: {
                            id: userId
                        }
                    }
                }
            }
        },

    })

    res.status(201).json(course)

})


export { router as createCourse }