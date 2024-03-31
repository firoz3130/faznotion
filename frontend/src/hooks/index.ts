import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
	content: string;
	title: string;
	id: number;
	author: {
		name: string;
	};
}

export const useBlog = ({ id }: { id: string }) => {
	const [loading, setLoading] = useState(true);
	const [blog, setBlog] = useState<Blog>();
	console.log("The token is ", localStorage.getItem("token"));
	try {
		useEffect(() => {
			axios
				.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				})
				.then((response) => {
					console.log("The response is ", response.data);
					setBlog(response.data.blog);
					setLoading(false);
				});
		}, [id]);
		return {
			loading,
			blog,
		};
	} catch (e) {
		console.log("The error is ", e);
	}
};

export const useBlogs = () => {
	const [loading, setLoading] = useState(true);
	const [blogs, setBlogs] = useState<Blog[]>([]);
	console.log("Sending request to the backend for Bulk api");
	console.log("The token is ", localStorage.getItem("token"));
	useEffect(() => {
		axios
			.post(
				`${BACKEND_URL}/api/v1/blog/bulk`,
				{},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			)
			.then((response) => {
				console.log("The response is ", response.data);
				setBlogs(response.data.blogs);
				setLoading(false);
			});
	}, []);
	console.log(
		"Returning blogs called from the useBlogs hook which contains",
		blogs
	);
	return {
		loading,
		blogs,
	};
};
