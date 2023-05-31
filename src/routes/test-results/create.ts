import express, { Request, Response } from 'express'
import requireAuth from '../../middlewares/require-auth'
import isTeacherOfCourseOrAdmin from '../../guards/isTeacherOrAdmin'
import { TestResultInputDto } from '../../dtos/test-result-input-dto'
import prisma from '../../client'
const router = express.Router()


router.post('/courses/:courseId/tests/:testId/test-results',
    requireAuth,
    isTeacherOfCourseOrAdmin,
    async (req: Request, res: Response) => {

        const testResultData = req.body as TestResultInputDto
        const testId = parseInt(req.params.testId)

        const createdTestResult = await prisma.testResult.create({
            data: {
                result: testResultData.result,
                student: {
                    connect: {
                        id: testResultData.studentId
                    }
                },
                graderBy: {
                    connect: {
                        id: testResultData.graderId
                    }
                },
                test: {
                    connect: {
                        id: testId
                    }
                }
            }
        })

        res.status(201).json(createdTestResult)

    })


export { router as createTestResult }