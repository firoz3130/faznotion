import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks";

interface Blog {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}


export const Blogs = () => {
    const { loading, blogs } = useBlogs();
    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <div >
            <Appbar />
            <div className="flex justify-center">
                {blogs.length > 0 ? (
                    blogs.map((blog: Blog) => (
                        <BlogCard
                            authorName={blog.authorName}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={"Published on 10/01/2024"} id={0} />
                    ))
                ) : (
                    <div>No blogs found.</div>
                )}
            </div>
        </div>
    );
}
