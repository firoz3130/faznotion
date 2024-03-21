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
            <div className="flex flex-col items-center justify-center">
                {blogs.map((blog: Blog, index: number) => {
                    return (
                        <BlogCard
                            key={index}
                            authorName={blog.authorName}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={blog.publishedDate}
                            id={0}
                        />
                    );
                })}
            </div>
        </div>
    );
}
