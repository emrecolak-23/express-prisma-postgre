import express, { Request, Response } from 'express'
import prisma from '../../client'
import { NotFoundError } from '../../errors/not-found-error'
const router = express.Router()


router.delete('/users/:userId', async (req: Request, res: Response) => {

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
        }
    })

    res.status(200).json(deletedUser)

})

export { router as deleteUser }