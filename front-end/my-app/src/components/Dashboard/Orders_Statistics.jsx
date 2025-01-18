
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loading from '../loading';

export default function OrdersStatistics({ classname })
{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [year, setYear] = useState();
    const [month, setMonth] = useState();
    const [years, setYears] = useState();
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    const fetchYears = () => {
        fetch('/api/statistics/Years')
            .then(res => res.json())
            .then(data => {
                setYears(data.years);
            })
            .catch((err) => console.log('errrrrrrrrrooooooooooooooor'));
    }
    const fetchData = () => {
        fetch(`/api/statistics/Orders/${year}/${month}`)
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                setData(data.data)
            })
            .catch((err) => console.log('errrrrrrrrrooooooooooooooor'));
    }

    useEffect(() => {
        const date = new Date();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        setMonth(month < 10 ? `0${month}` : month.toString());
        setYear(year.toString());
        fetchData();
        fetchYears();
    }, []);

    useEffect(() => {
        fetchData();
        fetchYears();
    }, [month, year]);

    const changeYear = (e) => {
        setYear(e.target.value);
    }

    const changeMonth = (e) => {
        setMonth(e.target.value);
    }

    return (
        <div className={classname}>
            <h2 className="absolute top-2 left-12 text-xl font-bold">Monthly Orders</h2>
            <div className="shadow-2xl flex flex-wrap px-5 pb-5 pt-4 border-b border-t border-r border-l border-gray- rounded-md">
                <div className="h-96 pt-8 w-full relative">
                    {loading ?
                        <Loading />
                    :
                        <>
                            <div className='z-10 absolute right-10 flex gap-1'>
                                <select onChange={changeYear} className=" h-10 font-black px-4 rounded-xl border border-gray-300">
                                    {years.map((year, index) => <option key={index} value={year} >{year}</option>)}
                                </select>
                                <select onChange={changeMonth} className="h-10 font-black px-4 rounded-xl border border-gray-300">
                                    {months.map((month, index) => <option key={index} value={month}>{month}</option>)}
                                </select>
                            </div>
                            <ResponsiveContainer width="100%" height="100%" className="rounded-3xl">
                                <LineChart width={500} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5,}}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="orders" stroke="#8884d8" activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}