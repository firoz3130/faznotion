import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
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
        return <div>
            <Appbar />
            <div className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div>
                {blogs.map((blog: Blog) => <BlogCard
                    id={1}
                    authorName={blog.authorName || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={"22nd Nov 2004"}
                />)}
            </div>
        </div>
    </div>
}
