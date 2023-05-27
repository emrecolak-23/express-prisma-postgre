// Import Dependencies
import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

// Import Middlewares
import validate from '../../middlewares/validate'
import { userUpdateValidation } from '../../validations/users'

const prisma = new PrismaClient()
const router = express.Router()


router.put('/users/:userId', validate(userUpdateValidation), async (req: Request, res: Response) => {
    const { userId } = req.params
    const userData = req.body

    const updatedUser = await prisma.user.update({
        where: {
            id: Number(userId)
        },
        data: userData
    })

    res.status(200).json(updatedUser)
})

export { router as updateUser }