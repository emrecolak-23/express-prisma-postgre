import express, { Request, Response } from 'express'
import prisma from '../../client'
import { User } from '@prisma/client'
import requireAuth from '../../middlewares/require-auth'


const router = express.Router()
router.get('/users', requireAuth, async (req: Request, res: Response) => {
    const users: User[] = await prisma.user.findMany({})
    res.status(200).json(users)
})

export { router as listUsers }