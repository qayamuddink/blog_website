import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signinInput, signupInput } from "@qyam/comman";
import { Hono } from "hono";
import { sign } from "hono/jwt";


export const userRouter = new Hono<
        {
            Bindings:{
                DATABASE_URL:string,
                JWT_SECRET:string
            }
        }
    >();



userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);

  if(!success) {

    c.status(411)
    return c.json({
        msg:"inputs are invalid "
    })
  }

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: c.env.DATABASE_URL,
      },
    },
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    return c.text(jwt);
  } catch (e) {
    console.log(e);
    c.status(411);
    return c.text("invalid");
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);

  if(!success){
    c.status(411)
    return c.json({
      message:"invalid inputs fields"
    })
  }
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: c.env.DATABASE_URL,
      },
    },
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });

      if (!user) {
        c.status(403); // unauthorized
        return c.json({
          message: "incorrect credential",
        });
      }
    const jwt = await sign({
        id : user.id
    } , c.env.JWT_SECRET)

    return c.json({
         jwt
    })
  
  } catch (e) {
      console.log("Error", e);
      c.status(500);
      c.json({
        message: "internal server error",
      });
  }



});
