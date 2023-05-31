import express, { Request, Response } from 'express'
import requireAuth from '../../middlewares/require-auth'
import isRequestedUserOrAdmin from '../../guards/isRequestedUserOrAdmin'
import prisma from '../../client'

const router = express.Router()


router.get('/users/:userId/test-results',
    requireAuth,
    isRequestedUserOrAdmin,
    async (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId)

        const userTestResults = await prisma.testResult.findMany({
            where: {
                studentId: userId
            }
        })

        res.status(200).json(userTestResults)

    })

export { router as showTestResult }