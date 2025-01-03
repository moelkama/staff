import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Sector } from 'recharts';
import { Link, Routes, Route } from "react-router-dom";


const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g className="overflow-hidden">
    <defs>
        <clipPath id="circle-clip">
            <circle cx={cx} cy={cy} r={50} />
        </clipPath>
    </defs>
    <image 
        x={cx - 50} // width / 2 
        y={cy - 50} // height / 2 
        href={payload.src} 
        width="100" 
        height="100" 
        clipPath="url(#circle-clip)" 
    />
    <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
    />
    <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
    />
    <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
    <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
    <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
    <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
    </text>
</g>

    );
};

function Articles_statistics() {
    const [data, setData] = useState([]);
    const [state, setState] = useState({activeIndex: 0});

    useEffect(() => {
        fetch('/api/statistics/Articles/fiwe')
            .then(res => res.json())
            .then(data => {
                console.log('data:::::::::::::', data);
                setData(data.data);
            })
            .catch((err) => console.log('errrrrrrrrrooooooooooooooor'));
    }, []);
    const onPieEnter = (_, index) => {
        setState({activeIndex: index,});
    };
    return (
        <div className='h-96 w-1/2'>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                <Pie
                    activeIndex={state.activeIndex}
                    activeShape={renderActiveShape}
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

function Orders_Statistics()
{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [year, setYear] = useState('2025');
    const [month, setMonth] = useState('01');
    const [years, setYears] = useState(['2025', '2024']);
    const [months, setMonths] = useState(['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']);

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
        fetchData();
    }, [month, year]);

    const changeYear = (e) => {
        setYear(e.target.value);
    }

    const changeMonth = (e) => {
        setMonth(e.target.value);
    }
    if (loading) return <h1>Loading...</h1>;

    return (
        <div className="h-80 w-[960px] relative">
            <div className='z-10 absolute top-4 right-10 flex gap-1'>
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
        </div>
    );
}


export default function Statistics() {
    return (
            <div className="w-full flex flex-col items-center gap-10">
                <section >
                    <div className="container px-5 py-10 mx-auto">
                        <div className="pt-3">
                            <h2 className="w-full leading-border-text -mb-2 pr-2 pl-2">
                                <span className="bg-white px-2 text-xl font-bold">Orders Per Month</span>
                            </h2>
                            <div className="flex flex-wrap px-5 pb-5 pt-4 border-b border-t border-r border-l border-gray-600 rounded-md">
                                <Orders_Statistics />
                            </div>
                        </div>
                    </div>
                </section>
                <section >
                    <div className="container px-5 py-10 mx-auto">
                        <div className="pt-3">
                            <h2 className="w-full leading-border-text -mb-2 pr-2 pl-2">
                                <span className="bg-white px-2 text-xl font-bold">Articles</span>
                            </h2>
                            {/* <div className="flex flex-wrap px-5 pb-5 pt-4 border-b border-t border-r border-l border-gray-600 rounded-md"> */}
                                <Articles_statistics />
                             {/* </div> */}
                        </div> 
                    </div>
                </section>
            </div>
            {/* <div className="flex gap-4 px-8">
                <Link to="Orders" className="text-xl text-black flex justify-center items-center h-10 w-24 bg-green-400 rounded-md transition duration-700 ease-in-out hover:bg-transparent border hover:border-slate-800">Orders</Link>
                <Link to="Articles" className="text-xl text-black flex justify-center items-center h-10 w-24 bg-green-400 rounded-md transition duration-700 ease-in-out hover:bg-transparent border hover:border-slate-800">Articles</Link>
            </div>
            <Routes>
                <Route path="Orders" element={<Orders_Statistics />} />
                <Route path="Articles" element={<Articles_statistics />} />
            </Routes> */}
    )
}