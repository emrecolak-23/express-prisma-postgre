import express, { Request, Response } from 'express'
import prisma from '../../client'
import { User } from '@prisma/client'
import { NotFoundError } from '../../errors/not-found-error'
import requireAuth from '../../middlewares/require-auth'

const router = express.Router()

router.get('/users/:userId', requireAuth, async (req: Request, res: Response) => {
    const { userId } = req.params
    const user: User | null = await prisma.user.findUnique({
        where: {
            id: Number(userId)
        }
    })

    if (!user) {
        throw new NotFoundError()
    }

    res.status(200).json(user)
})

export { router as showUser }