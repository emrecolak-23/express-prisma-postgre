import express, { Request, Response } from 'express'
import requireAuth from '../../middlewares/require-auth'
import isRequestedUserOrAdmin from '../../guards/isRequestedUserOrAdmin'
import prisma from '../../client'
const router = express.Router()


router.delete('/users/:userId/courses/:courseId',
    requireAuth,
    isRequestedUserOrAdmin,
    async (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId)
        const courseId = parseInt(req.params.courseId)

        await prisma.courseEnrollment.delete({
            where: {
                userId_courseId: {
                    userId,
                    courseId
                }
            }
        })

        res.status(204).json()

    })


export { router as deleteEnrollment }