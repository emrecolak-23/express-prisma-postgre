import express, { Request, Response } from 'express'
import { CourseInputDto } from '../../dtos/course-input-dto'
import isTeacherOfCourseOrAdmin from '../../guards/isTeacherOrAdmin'
import requireAuth from '../../middlewares/require-auth'
import validate from '../../middlewares/validate'
import { inputCourseValidation } from '../../validations/courses'
import prisma from '../../client'
const router = express.Router()


router.put('/courses/:courseId', requireAuth, isTeacherOfCourseOrAdmin, validate(inputCourseValidation), async (req: Request, res: Response) => {
    const { courseId } = req.params
    const courseData = req.body as Partial<CourseInputDto>

    const updatedCourse = await prisma.course.update({
        where: {
            id: Number(courseId)
        },
        data: courseData
    })

    res.status(200).json(updatedCourse)

})

export { router as updateCourse }