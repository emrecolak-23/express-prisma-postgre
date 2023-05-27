import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()

router.get('/users/:userId', async (req: Request, res: Response) => {
    const { userId } = req.params
    const user = await prisma.user.findUnique({
        where: {
            id: Number(userId)
        }
    })

    res.status(200).json(user)
})

export { router as showUser }