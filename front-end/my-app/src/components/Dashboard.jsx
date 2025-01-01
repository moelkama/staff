import { Link, Routes, Route } from "react-router-dom";
import Articles from "./Dashboard/Articles";
import Statistic from "./Dashboard/Statistic";

export default function Dashboard() {
    return (
        <>
            <div className="flex gap-4 px-8">
                <div className="min-h-full bg-yellow-300 flex flex-col justify-center gap-4">
                    <Link to="Articles" className="text-xl text-black flex justify-center items-center h-10 w-24 bg-green-400 rounded-md transition duration-700 ease-in-out hover:bg-transparent border hover:border-slate-800">Categories</Link>
                    <Link to="2" className="text-xl text-black flex justify-center items-center h-10 w-24 bg-green-400 rounded-md transition duration-700 ease-in-out hover:bg-transparent border hover:border-slate-800">Other</Link>
                </div>
                <Routes >
                    <Route path="Articles/*" element={<Articles />} />
                    <Route path="statistic" element={<Statistic />} />
                </Routes>
            </div>
        </>
    )
}