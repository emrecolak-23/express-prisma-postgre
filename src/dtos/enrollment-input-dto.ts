import { UserRole } from "@prisma/client";

export interface EnrollmentInputDto {
    courseId: number,
    role: UserRole
}