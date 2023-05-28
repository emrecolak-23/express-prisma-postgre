
export interface UserInputDto {
    email: string,
    firstname: string,
    lastName: string,
    social: {
        instagram?: string
        facebook?: string,
        twitter?: string,
        github?: string,
        website?: string
    }

}