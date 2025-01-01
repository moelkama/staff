// from React import "React";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faEye, faPrint } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";

function Table( {orders} ) {
    if (orders.length === 0)
        return <div className="text-2xl font-black text-center text-red-500">No Orders Found</div>
    return (
        <table className="table-auto mx-auto border-collapse border border-gray-200">
            <thead className="bg-gray-200">
                <tr>
                    <th className="px-6 py-3 text-sm font-medium text-black uppercase text-center hover:bg-blue-200">ID</th>
                    <th className="px-6 py-3 text-sm font-medium text-black uppercase text-center">Date</th>
                    <th className="px-6 py-3 text-sm font-medium text-black uppercase text-center">Total</th>
                    <th className="px-6 py-3 text-sm font-medium text-black uppercase text-center">Actions</th>
                </tr>
            </thead>

            <tbody>
                {orders.map((order, index) => 
                {
                    const date = new Date(order.date);

                    const day = String(date.getUTCDate()).padStart(2, '0');
                    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                    const year = date.getUTCFullYear();

                    const hours = String(date.getUTCHours()).padStart(2, '0'); 
                    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
                    // const seconds = String(date.getUTCSeconds()).padStart(2, '0');

                    const date_string = `${day}/${month}/${year} ${hours}:${minutes}`; //:${seconds}
                    return (
                        <tr key={order.id} className="border-t border-gray-200 bg-gray-100">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ order.id }</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ date_string }</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ order.total }</td>
                            
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                <a className="text-center text-xl transition duration-700 ease-in-out font-black inline-block px-6 py-2 bg-blue-400 rounded-md border hover:border-slate-800 hover:bg-transparent" href="/">
                                    <FontAwesomeIcon icon={faPrint} />
                                </a>
                                <a href={`/generate_pdf/${order.id}`} className="text-center text-xl transition duration-700 ease-in-out font-black inline-block px-6 py-2 bg-green-400 hover:bg-blue-600 rounded-md border hover:border-slate-800 hover:bg-transparent" target='_blank'>
                                    <FontAwesomeIcon icon={faEye} />
                                </a>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}


export default function Search() {
    const [orders, set_orders] = useState([]);
    const [loading, set_loading] = useState(true);
    const [period_time, set_period_time] = useState("LAST_WEEK");
    const [period_times, set_period_times] = useState([]);
    const [search_id, set_search_id] = useState("D4XEPC");

    useEffect(() => {
        const url = `/api/find_order/${period_time}`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            set_orders(data.orders);
            set_period_time(data.period_time);
            set_period_times(data.period_times);
            set_loading(false);
        })
    }, [period_time]);

    const handleInputChange = (event) => {
        const search = event.target.value;
        console.log("id::::::::::::::::", search);
        set_search_id(search);
    }

    const handleChange = (event) => {
        set_period_time(event.target.value);
        console.log("Selected value:", period_time);
    };

    const sumbit_search = () => {
        const url = `/api/search_order/${search_id}`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            set_orders([data]);
        })
        .catch(() => {
            console.error('Errorrrrrrrrrrrrrrrrrr');
        });
    }
    if (loading) return <h1>Loading...</h1>;
    // if (!search_results) return <h1>Error</h1>;
    return (
        <div className="flex flex-col gap-8 items-center">
            <div id="search-container" className="h-10 w-[660px] flex flex-col gap-8">
                <div className="flex items-center justify-evenly">
                    <input onChange={handleInputChange} className="font-bold h-10 w-4/5 border px-4 border-gray-300 rounded-xl" type="text" placeholder="Search Order"></input>
                    <button onClick={sumbit_search} className="font-bold rounded-xl h-10 flex px-4 justify-center items-center bg-green-400 hover:border hover:border-slate-800 hover:bg-transparent">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </div>
            <div className="flex gap-8">
                <select onChange={handleChange} defaultValue={period_time} className="w-40 h-10 rounded-xl border border-gray-300">
                    {period_times.map( (pt) => <option key={pt} value={pt}>{pt}</option>)}
                </select>
            </div>
            <Table orders={orders} />
        </div>
    );
}