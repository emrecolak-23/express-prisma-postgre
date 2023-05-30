import express, { Request, Response } from 'express'
import validate from '../../middlewares/validate'
import { loginValidation } from '../../validations/login'
import { generateEmailToken } from '../../utils/helper'
import add from 'date-fns/add'
import { EMAIL_TOKEN_EXPIRATION_MINUTES } from '../../utils/constants'
import prisma from '../../client'
import { TokenType } from '@prisma/client'
import Mailer from '../../services/Mailer'
import { LoginInputDto } from '../../dtos/login-input-dto'
const router = express()



router.post('/login', validate(loginValidation), async (req: Request, res: Response) => {
    const { email } = req.body as LoginInputDto
    const emailToken = generateEmailToken()

    const tokenExpiration = add(new Date(), {
        minutes: EMAIL_TOKEN_EXPIRATION_MINUTES,
    })

    await prisma.token.create({
        data: {
            emailToken,
            type: TokenType.EMAIL,
            expiration: tokenExpiration,
            user: {
                connectOrCreate: {
                    create: {
                        email,
                    },
                    where: {
                        email,
                    },
                },
            },
        }
    })

    const mail = new Mailer('Authenticate Token', email, emailToken)
    await mail.send()

    res.status(200).json({ message: 'Authenticate token sent your email' })

})


export { router as login }