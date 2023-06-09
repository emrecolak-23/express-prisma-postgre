import express, { Request, Response } from 'express'
import requireAuth from '../../middlewares/require-auth'
import isRequestedUserOrAdmin from '../../guards/isRequestedUserOrAdmin'
import { EnrollmentInputDto } from '../../dtos/enrollment-input-dto'
import prisma from '../../client'
import validate from '../../middlewares/validate'
import { createEnrollmentInputValidation } from '../../validations/enrollments'
import { UserRole } from '@prisma/client'
const router = express.Router()


router.post('/users/:userId/courses',
    requireAuth,
    isRequestedUserOrAdmin,
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
                role: enrollmentData.role === 'STUDENT' ? UserRole.STUDENT : UserRole.TEACHER
            }
        })


        res.status(201).json(userCourses)
    })

export { router as createEnrollment }