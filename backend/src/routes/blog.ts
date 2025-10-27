
import { Hono } from "hono";

import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "../generated/prisma/edge";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@qyam/comman";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables:{
    userId: string
  }
}>();

blogRouter.use("/*", async (c, next) => {
    
    const authHeader =  c.req.header("authorization") || "" ;
    // const user = await verify<{id: string}>(authHeader, c.env.JWT_SECRET)
    try {
        
    const user = (await verify(authHeader, c.env.JWT_SECRET)) as { id: string };

    if (user) {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({
        message: "you are not logged in",
      });
    }
    } catch (e) {
          c.status(403);
          return c.json({
            message: "you are not logged in",
          });
    }

});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();

  const { success } =  createBlogInput.safeParse(body)

  if(!success){
    c.status(411)
    return c.json({
      message:"inputs are incorrect"
    })
  }

  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const blog = await prisma.post.create({
    data:{
        title:body.title,
        content: body.content,
        authorId: authorId
    }
  })

  return c.json({
    id:blog.id
  })

});

blogRouter.put("/", async (c) => {

    const body = await c.req.json()

    const { success } = updateBlogInput.safeParse(body);

    if(!success) {
      c.status(411)
      return c.json({
        message:"inputs are not valid when updating "
      })
    }

    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blog = await prisma.post.update({
        where:{
            id : body.id
        },
        data:{
            title:body.title,
            content: body.content
        }
    })

    return c.json({
        id: blog.id
    })

});



blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.post.findMany();

    return c.json({
      blogs,
    });
  } catch (e) {
    console.log(e);
    c.status(403);
    return c.json({
      message: "not getting all blogs from the bulk end point",
    });
  }
});

blogRouter.get("/:id", async(c) => {

    const id =  c.req.param("id")

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        
    const blog = await prisma.post.findFirst({
      where: {
        id: id,
      },
    });

    return c.json({
      blog,
    });

    } catch (e) {
        
        c.status(411)
        return c.json({
            message:"error while fetching the blog post"
        })
    }
});


//todo : add pagination 