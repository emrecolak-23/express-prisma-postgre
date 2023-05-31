import express, { Request, Response } from 'express'
import requireAuth from '../../middlewares/require-auth'
import isTeacherOfCourseOrAdmin from '../../guards/isTeacherOrAdmin'
import prisma from '../../client'
const router = express.Router()


router.get('/courses/:courseId/tests/:testId/test-results',
    requireAuth,
    isTeacherOfCourseOrAdmin,
    async (req: Request, res: Response) => {
        const testId = parseInt(req.params.testId)

        const testResults = await prisma.testResult.findMany({
            where: {
                testId: testId
            }
        })

        res.status(200).json(testResults)
    })

export { router as listTestResults }