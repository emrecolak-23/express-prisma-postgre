import request from 'supertest'
import { app } from '../app'
import { generateAuthToken, generateEmailToken } from '../utils/helper'
import { EMAIL_TOKEN_EXPIRATION_MINUTES } from '../utils/constants'
import add from 'date-fns/add'
import prisma from '../client'
import { TokenType } from '@prisma/client'
declare global {
    var auth: () => any
}



afterAll(async () => {
    const user = await prisma.user.findUnique({
        where: {
            email: 'ecolak575@gmail.com'
        }
    })

    if (user) {
        await prisma.token.deleteMany({
            where: {
                userId: user.id
            }
        })
    }
})

global.auth = async () => {
    const email: string = "ecolak575@gmail.com"
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

    const response = await request(app)
        .post('/authenticate')
        .send({
            email: email,
            emailToken: emailToken
        })

    const authToken = response.body.authToken

    return authToken
}