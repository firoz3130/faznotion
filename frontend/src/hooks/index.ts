import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

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

	useEffect(() => {
		axios
			.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then((response) => {
				console.log("Blog fetched successfully:", response.data);
				setBlog(response.data);
				setLoading(false);
			});
	}, [id]);

	return {
		loading,
		blog,
	};
};

export const useBlogs = () => {
	const [loading, setLoading] = useState(true);
	const [blogs, setBlogs] = useState([]);
	const token = localStorage.getItem("token");
	console.log("token is ", token);
	useEffect(() => {
		// Ensure token exists before making the request
		if (token) {
			axios
				.post(
					`${BACKEND_URL}/api/v1/blog/bulk`,
					{}, // Empty data object
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				.then((response) => {
					console.log("Blogs fetched successfully:", response.data);
					setBlogs(response.data);
					setLoading(false);
				})
				.catch((error) => {
					console.log("Error fetching blogs:", error);
					setLoading(false);
				});
		} else {
			setLoading(false); // Set loading to false if there's no token
		}
	}, [token]); // Dependency array to ensure useEffect runs when token changes

	return {
		loading,
		blogs,
	};
};
