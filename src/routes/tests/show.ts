import express, { Request, Response } from 'express'
import prisma from '../../client'
import { NotFoundError } from '../../errors/not-found-error'
import requireAuth from '../../middlewares/require-auth'

const router = express.Router()

router.get('/courses/tests/:testId', requireAuth, async (req: Request, res: Response) => {
    const testId = parseInt(req.params.testId)

    const test = await prisma.test.findUnique({
        where: {
            id: testId
        }
    })

    if (!test) {
        throw new NotFoundError()
    }

    res.status(200).json(test)

})

export { router as showTest }