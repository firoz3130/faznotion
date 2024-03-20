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
			message: "Signed up",
			jwt: token,
		});
	} catch (e) {
		console.log("Error is ", e);
		c.status(403);
		return c.json({
			Message: "username already exists",
		});
	}
});

userRouter.post("/signin", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	try {
		console.log("email is ", body.email, "password is ", body.password);
		const user = await prisma.user.findUnique({
			where: {
				username: body.username,
				password: body.password,
			},
		});
		console.log("User is ", user);
		if (user) {
			const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
			return c.json({ token: jwt, message: "Signed in" });
		} else {
			console.log("Error Signing in"); //The system can show error signing in if the user is not found in the database or the password is incorrect.
			//But in my case both the email and password are correct and still it is showing error signing in. This can be a bug in the code.
			c.status(403);
			return c.json({ message: "Error Signing in" });
		}
	} catch (e) {
		c.status(403);
		return c.json({ message: "user not found" });
	}
});
