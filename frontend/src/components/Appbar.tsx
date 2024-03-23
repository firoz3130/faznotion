import { Avatar } from "./BlogCard"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-9">
        <div className="flex flex-col justify-center">
            FazBlogs
        </div>
        <div>
            <Avatar name="Firoz" size="big" />
        </div>
    </div>
}