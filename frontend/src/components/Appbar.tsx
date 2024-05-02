import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-9">
        <div className="flex flex-col justify-center">
            <Link to="/blogs">
                <button>
                    FazBlogs
                </button>
            </Link>
        </div>
        <div className="flex justify-end space-x-4 items-center">
            <Link to='/publish'>
                <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300
                font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">New</button>
            </Link>
            <Avatar name="Firoz" size="big" />
        </div>
    </div>
}