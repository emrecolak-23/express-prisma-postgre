import express, { Request, Response } from 'express'
import prisma from '../../client'
import { UserInputDto } from '../../dtos/user-input-dto'
import validate from '../../middlewares/validate'
import { userInputValidation } from '../../validations/users'
import { BadRequestError } from '../../errors/bad-request-error'
import { User } from '@prisma/client'

const router = express.Router()

router.post('/users', validate(userInputValidation), async (req: Request, res: Response) => {

    const userData = req.body as UserInputDto

    const existingUser: User | null = await prisma.user.findUnique({
        where: {
            email: userData.email
        }
    })

    if (existingUser) {
        throw new BadRequestError('Email in use')
    }

    const user: User = await prisma.user.create({
        data: {
            email: userData.email,
            firstname: userData.firstname,
            lastName: userData.lastName,
            social: userData.social
        }
    })

    res.status(201).json(user)
})

export { router as createUser }