import { Request, Response, NextFunction } from "express";
import { decodeAuthToken } from "../utils/helper";
import prisma from "../client";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { User } from "@prisma/client";


declare global {
    namespace Express {
        interface Request {
            currentUser?: User
        }
    }
}

const currentUser = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('authorization');

    if (!authHeader) {
        return next()
    }

    const token = authHeader.split(' ')[1]; // ["Bearer" "<token>"]
    const tokenId = decodeAuthToken(token)
    const fetchedToken = await prisma.token.findUnique({
        where: {
            id: Number(tokenId)
        },
        include: { user: true }
    })

    if (!fetchedToken || !fetchedToken?.valid) {
        throw new NotAuthorizedError()
    }

    if (fetchedToken.expiration < new Date()) {
        throw new NotAuthorizedError()
    }

    req.currentUser = fetchedToken.user

    return next()

}

export default currentUser