
import z from "zod"

export const signupInput = z.object({
    email:z.string(),
    password: z.string().min(6),
    name:z.string().optional()
})



// //type inference in zod 

export const signinInput = z.object({
    email: z.string(),
    password:z.string().min(6)
})

export const createBlogInput = z.object({
    title : z.string(),
    content:z.string()
})

export const updateBlogInput = z.object({
    title: z.string(),
    content:z.string(),
    id: z.string()
})

export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>
export type SignupInput = z.infer<typeof signupInput>
export type SigninInpput = z.infer<typeof signinInput>