import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const [loading, blogs] = useBlogs();
    if (loading) {
        return <div>Loading...</div>
    }

    return <div >
        <Appbar />
        <div><BlogCard
            authorName={"Shamika"}
            title={"Love you to the moon and back"}
            content={"A guy who is well known to be a "}
            publishedDate={"10/01/2023"}
            id={3}
        /></div>
        <div>
            <BlogCard
                authorName={"Shamika"}
                title={"Love you to the moon and back"}

                content={"A guy who is well known to be a "}
                publishedDate={"10/01/2023"}
                id={1}
            /></div>

    </div>
}