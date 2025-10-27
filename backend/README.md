```txt
npm install
npm run dev
```

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen


blogRouter.use("/*", async (c, next) => {
    
    const authHeader =  c.req.header("authorization") || "" ;
    const rawUser = await verify(authHeader, c.env.JWT_SECRET) as unknown;
    const user = rawUser as { id?: string } | null;

    if (user && typeof user.id === "string") {
        c.set("userId", user.id)
        await next()
    }
    else {
        c.status(403);
        return c.json({
            message: "you are not logged in"
        })
    }
});
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()


```
