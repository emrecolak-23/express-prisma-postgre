import express, { Request, Response } from 'express'
import requireAuth from '../../middlewares/require-auth'
import isTeacherOfCourseOrAdmin from '../../guards/isTeacherOrAdmin'
import prisma from '../../client'
const router = express.Router()


router.delete('/courses/:courseId', requireAuth, isTeacherOfCourseOrAdmin, async (req: Request, res: Response) => {
    const { courseId } = req.params

    await prisma.$transaction([
        prisma.courseEnrollment.deleteMany({
            where: {
                courseId: Number(courseId)
            }
        }),
        prisma.course.delete({
            where: {
                id: Number(courseId)
            }
        })
    ])

    res.status(204).json()

})


export { router as deleteCourse }