import express, { Request, Response } from 'express'
import requireAuth from '../../middlewares/require-auth'
import isGraderOfTestResultOrAdmin from '../../guards/isGraderOfTestResultOrAdmin'
import prisma from '../../client'
const router = express.Router()


router.delete('/courses/:courseId/test/test-results/:testResultId',
    requireAuth,
    isGraderOfTestResultOrAdmin,
    async (req: Request, res: Response) => {
        const testResultId = parseInt(req.params.testResultId)

        await prisma.testResult.delete({
            where: {
                id: testResultId
            }
        })

        res.status(204).json()
    })

export { router as deleteTestResult }