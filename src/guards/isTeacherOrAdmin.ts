import { Request, Response, NextFunction } from "express";
import prisma from "../client";
import { UserRole } from "@prisma/client";
import { NotAuthorizedError } from "../errors/not-authorized-error";


const isTeacherOfCourseOrAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { isAdmin, id } = req.currentUser!

    if (isAdmin) {
        return next()
    }

    const { courseId } = req.params

    const teacherOf = await prisma.courseEnrollment.findMany({
        where: {
            userId: id,
            role: UserRole.TEACHER
        },
        select: {
            courseId: true
        }
    })

    const coursesId = teacherOf.map(({ courseId }) => courseId)
    if (coursesId.includes(Number(courseId))) {
        return next()
    }

    throw new NotAuthorizedError()

}

export default isTeacherOfCourseOrAdmin