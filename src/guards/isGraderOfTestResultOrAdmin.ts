import { Request, Response, NextFunction } from 'express'
import prisma from '../client'
import { ForbiddenError } from '../errors/forbidden-error'

const isGraderOfTestResultOrAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { id, isAdmin } = req.currentUser!

    if (isAdmin) {
        return next()
    }

    const testResultId = parseInt(req.params.testResultId)

    const testResult = await prisma.testResult.findUnique({
        where: {
            id: testResultId
        }
    })

    if (testResult?.graderId === id) {
        return next()
    }

    throw new ForbiddenError()
}


export default isGraderOfTestResultOrAdmin