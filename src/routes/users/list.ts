import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()


router.get('/users', async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({})
    res.status(200).json(users)
})

export { router as listUsers }