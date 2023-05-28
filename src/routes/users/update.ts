// Import Dependencies
import express, { Request, Response } from 'express'
import prisma from '../../client'

// Import Middlewares
import validate from '../../middlewares/validate'
import { userInputValidation } from '../../validations/users'
import { UserInputDto } from '../../dtos/user-input-dto'
import { NotFoundError } from '../../errors/not-found-error'
import { User } from '@prisma/client'
const router = express.Router()


router.put('/users/:userId', validate(userInputValidation), async (req: Request, res: Response) => {
    const { userId } = req.params

    const userData = req.body as UserInputDto

    const existingUser: User | null = await prisma.user.findUnique({
        where: {
            id: Number(userId)
        }
    })

    if (!existingUser) {
        throw new NotFoundError()
    }

    const updatedUser: User = await prisma.user.update({
        where: {
            id: Number(userId)
        },
        data: userData
    })

    res.status(200).json(updatedUser)
})

export { router as updateUser }