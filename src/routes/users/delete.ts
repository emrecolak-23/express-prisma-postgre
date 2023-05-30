import express, { Request, Response } from 'express'
import prisma from '../../client'
import { NotFoundError } from '../../errors/not-found-error'
import requireAuth from '../../middlewares/require-auth'

const router = express.Router()


router.delete('/users/:userId', requireAuth, async (req: Request, res: Response) => {

    const { userId } = req.params

    const existingUser = await prisma.user.findUnique({
        where: {
            id: Number(userId)
        }
    })

    if (!existingUser) {
        throw new NotFoundError()
    }

    const deletedUser = await prisma.user.delete({
        where: {
            id: Number(userId)
        },
        include: {
            courses: true
        }
    })

    res.status(200).json(deletedUser)

})

export { router as deleteUser }