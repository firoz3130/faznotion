import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string; //userId is a variable that is set in the middleware
	};
}>();

blogRouter.use(async (c, next) => {
	const jwt = c.req.header("Authorization");
	console.log("Inside the blog middleware is \nJWT is ", jwt);
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized " });
	}
	const token = jwt.split(" ")[1];
	const payload = await verify(token, c.env.JWT_SECRET);
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized after payload" });
	}
	c.set("userId", payload.id);
	await next();
});

blogRouter.post("/", async (c) => {
	console.log("Inside the create blog router root");
	const userId = c.get("userId");
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId,
		},
	});
	return c.json({
		message: "Blog Post created successfully",
		id: post.id,
	});
});

blogRouter.put("/", async (c) => {
	const userId = c.get("userId");
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	console.log("UserId is ", userId);
	const body = await c.req.json();
	console.log("Body id is ", body.id);
	try {
		const response = await prisma.post.update({
			where: {
				id: body.id,
				authorId: userId,
			},
			data: {
				title: body.title,
				content: body.content,
			},
		});
		return c.json(response);
	} catch (e) {
		return c.json({ message: "Blog not found" });
	}
});

blogRouter.get("/:id", async (c) => {
	const id = c.req.param("id");
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const post = await prisma.post.findUnique({
			where: {
				id,
			},
		});

		return c.json(post);
	} catch (e) {
		return c.json({ message: "Blog not found" });
	}
});

blogRouter.post("/delete", async (c) => {
	console.log("Inside the delete blog router");
	const userId = c.get("userId");
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	try {
		await prisma.post.delete({
			where: {
				id: body.id,
			},
		});
		return c.text("deleted blog");
	} catch (e) {
		return c.text("Blog not found");
	}
});

blogRouter.post("/bulk", async (c) => {
	console.log("Inside the bulk blog router");
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	try {
		const blogs = await prisma.post.findMany({
			select: {
				content: true,
				title: true,
				id: true,
				author: {
					select: {
						name: true,
					},
				},
			},
		});
		console.log("Posts are ", blogs);
		return c.json(blogs);
	} catch (e) {
		return c.json({ message: "Error Fetching Blogs" });
	}
});
