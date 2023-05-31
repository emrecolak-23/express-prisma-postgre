import express, { Request, Response } from 'express'
import requireAuth from '../../middlewares/require-auth'
import { EnrollmentInputDto } from '../../dtos/enrollment-input-dto'
import prisma from '../../client'
import validate from '../../middlewares/validate'
import { createEnrollmentInputValidation } from '../../validations/enrollments'
const router = express.Router()


router.post('/users/:userId/courses',
    requireAuth,
    validate(createEnrollmentInputValidation),
    async (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId)
        const enrollmentData = req.body as EnrollmentInputDto

        const userCourses = await prisma.courseEnrollment.create({
            data: {
                user: {
                    connect: {
                        id: userId
                    }
                },
                course: {
                    connect: {
                        id: enrollmentData.courseId
                    }
                },
                role: enrollmentData.role
            }
        })


        res.status(201).json(userCourses)
    })

export { router as createEnrollment }