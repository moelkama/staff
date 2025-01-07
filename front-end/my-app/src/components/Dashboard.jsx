import { Link, Routes, Route } from "react-router-dom";
import Articles from "./Dashboard/Articles";
import Statistics from "./Dashboard/Statistics";

export default function Dashboard() {
    return (
            <div className="flex-1 flex gap-4">
                <div className="border-r flex flex-col justify-center gap-4 px-4">
                    <Link to="Orders" className="font-bold text-xl text-white flex justify-center items-center h-10 w-28 bg-green-400 rounded-md transition duration-700 ease-in-out hover:bg-transparent border hover:border-slate-800">Orders</Link>
                    <Link to="Articles" className="font-bold text-xl text-white flex justify-center items-center h-10 w-28 bg-green-400 rounded-md transition duration-700 ease-in-out hover:bg-transparent border hover:border-slate-800">Categories</Link>
                    <Link to="statistics" className="font-bold text-xl text-white flex justify-center items-center h-10 w-28 bg-green-400 rounded-md transition duration-700 ease-in-out hover:bg-transparent border hover:border-slate-800">Statistics</Link>
                </div>
                <Routes >
                    <Route path="Articles/*" element={<Articles />} />
                    <Route path="statistics/*" element={<Statistics />} />
                </Routes>
            </div>
    )
}