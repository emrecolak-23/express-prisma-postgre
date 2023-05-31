import express, { Request, Response } from 'express'
import requireAuth from '../../middlewares/require-auth'
import isTeacherOfCourseOrAdmin from '../../guards/isTeacherOrAdmin'
import prisma from '../../client'

const router = express.Router()

router.delete('/courses/:courseId/tests/:testId',
    requireAuth,
    isTeacherOfCourseOrAdmin,
    async (req: Request, res: Response) => {

        const testId = parseInt(req.params.testId)

        await prisma.test.delete({
            where: {
                id: testId
            }
        })

        res.status(204).json()
    })


export { router as deleteTest }