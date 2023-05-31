import express, { Request, Response } from 'express'
import requireAuth from '../../middlewares/require-auth'
import isTeacherOfCourseOrAdmin from '../../guards/isTeacherOrAdmin'
import { TestInput } from '../../dtos/test-input-dto'
import prisma from '../../client'
import validate from '../../middlewares/validate'
import { createTestInputValidation } from '../../validations/tests'
import { format } from 'date-fns'
const router = express.Router()

router.post('/courses/:courseId/tests',
    requireAuth,
    isTeacherOfCourseOrAdmin,
    validate(createTestInputValidation),
    async (req: Request, res: Response) => {

        const testData = req.body as TestInput
        const courseId = parseInt(req.params.courseId)
        const dateObj = new Date(testData.date)

        const createdTest = await prisma.test.create({
            data: {
                name: testData.name,
                date: format(dateObj, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
                course: {
                    connect: {
                        id: courseId
                    }
                }
            }
        })

        res.status(201).json(createdTest)

    })

export { router as createTest }