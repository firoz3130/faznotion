import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
}>();

userRouter.post("/signup", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	console.log("Body is ", body);
	console.log("Email is ", body.email);
	try {
		const user = await prisma.user.create({
			data: {
				username: body.username,
				email: body.username,
				password: body.password,
				name: body?.name,
			},
		});
		console.log("User is ", user);
		const token = await sign({ id: user.id }, c.env.JWT_SECRET);

		return c.json({
			jwt: token,
		});
	} catch (e) {
		console.log("Error is ", e);
		c.status(403);
		return c.json({
			Message: "Error Signing up",
		});
	}
});

userRouter.post("/signin", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const user = await prisma.user.findUnique({
		where: {
			email: body.email,
			password: body.password,
		},
	});

	if (!user) {
		c.status(403);
		return c.json({ message: "user not found" });
	}

	const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
	return c.json({ token: jwt, message: "Signed in" });
});
