import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

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
