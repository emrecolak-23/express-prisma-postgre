import express, { Request, Response } from 'express'
import currentUser from '../../middlewares/current-user'
import prisma from '../../client'
import { UserRole } from '@prisma/client'

const router = express.Router()

router.post('/checkAuth', currentUser, async (req: Request, res: Response) => {

    const teacherOf = await prisma.courseEnrollment.findMany({
        where: {
            userId: req.currentUser?.id,
            role: UserRole.TEACHER
        },
        select: {
            courseId: true
        }
    })

    res.status(200).json({ user: req.currentUser || null, teacherOf: teacherOf.map((courseId) => courseId) })
})

export { router as checkAuth }