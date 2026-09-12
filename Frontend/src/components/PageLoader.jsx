import { LoaderIcon } from "lucide-react";
import pageLoader from "./components/pageLoader"
function pageLoader() {
    return (
        <div className="flex justify-center items-center h-screen ">
            <LoaderIcon className="size-10 animate-spin text-blue-500" />
        </div>
    )
}

export default pageLoader
