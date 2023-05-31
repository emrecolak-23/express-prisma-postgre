import express, { Request, Response } from 'express'
import requireAuth from '../../middlewares/require-auth'
import isTeacherOfCourseOrAdmin from '../../guards/isTeacherOrAdmin'
import validate from '../../middlewares/validate'
import { updateTestInputValidation } from '../../validations/tests'
import { TestInput } from '../../dtos/test-input-dto'
import prisma from '../../client'

const router = express.Router()


router.put('/courses/:courseId/tests/:testId',
    requireAuth,
    isTeacherOfCourseOrAdmin,
    validate(updateTestInputValidation),
    async (req: Request, res: Response) => {

        const dateString = req.body.date

        if (dateString) {
            req.body.date = new Date(dateString)
        }

        const testData = req.body as Partial<TestInput>

        const testId = parseInt(req.params.testId)

        const updatedTest = await prisma.test.update({
            where: {
                id: testId
            },
            data: testData
        })

        res.status(200).json(updatedTest)

    })

export { router as updateTest }