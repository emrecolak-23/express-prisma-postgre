import express, { Request, Response } from 'express'
import requireAuth from '../../middlewares/require-auth'
import prisma from '../../client'

const router = express.Router()


router.get('/users/:userId/courses',
    requireAuth,
    async (req: Request, res: Response) => {

        const userId = parseInt(req.params.userId)

        const userCourses = await prisma.course.findMany({
            where: {
                members: {
                    some: {
                        userId: userId
                    }
                }
            }
        })


        res.status(200).json(userCourses)
    })


export { router as listEnrollments }