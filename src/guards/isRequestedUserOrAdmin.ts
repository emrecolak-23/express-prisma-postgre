import { Request, Response, NextFunction } from "express";
import { ForbiddenError } from "../errors/forbidden-error";

const isRequestedUserOrAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { id, isAdmin } = req.currentUser!

    if (isAdmin) {
        return next()
    }

    const requestedUserId = parseInt(req.params.userId)

    if (requestedUserId === id) {
        return next()
    }


    throw new ForbiddenError()
}