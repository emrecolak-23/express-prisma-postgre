import express, { Request, Response } from 'express'
import { AuthenticateDto } from '../../dtos/authenticate-dto'
import prisma from '../../client'
import { NotAuthorizedError } from '../../errors/not-authorized-error'
import { AUTHENTICATION_TOKEN_EXPIRATION_HOURS } from '../../utils/constants'
import { add } from 'date-fns'
import { TokenType } from '@prisma/client'
import { generateAuthToken } from '../../utils/helper'
import validate from '../../middlewares/validate'
import { authenticateValidation } from '../../validations/authenticate'

const router = express.Router()

router.post('/authenticate', validate(authenticateValidation), async (req: Request, res: Response) => {
    const { email, emailToken } = req.body as AuthenticateDto

    const fetchedEmailToken = await prisma.token.findUnique({
        where: {
            emailToken: emailToken
        },
        include: {
            user: true
        }
    })

    if (!fetchedEmailToken?.valid) {
        throw new NotAuthorizedError()
    }

    if (fetchedEmailToken.expiration < new Date()) {
        throw new NotAuthorizedError()
    }

    if (fetchedEmailToken.user.email !== email) {
        throw new NotAuthorizedError()
    }

    const tokenExpiration = add(new Date(), {
        hours: AUTHENTICATION_TOKEN_EXPIRATION_HOURS
    })

    const createdToken = await prisma.token.create({
        data: {
            type: TokenType.API,
            expiration: tokenExpiration,
            user: {
                connect: {
                    email
                }
            }
        }
    })

    await prisma.token.update({
        where: {
            id: fetchedEmailToken.id,
        },
        data: {
            valid: false
        }
    })

    const authToken = generateAuthToken(createdToken.id.toString())

    res.status(200).json({ authToken })

})


export { router as authenticate }