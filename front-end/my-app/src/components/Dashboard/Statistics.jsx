import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import OrdersStatistics from './Orders_Statistics';
import ArticlesStatistics from './Articles_Statistics';

function MonthlyOrdersPerYear() {
    // const {xAxis_data, yAxis_data} = props.data;
    const [years, setYears] = useState(['2025', '2024']);
    const [year, setYear] = useState('2025');
    const [data, setData] = useState(
        {
            xAxis_data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            yAxis_data: [2400, 1398, 9800, 3908, 4800, 3490, 4300, 2100, 2300, 2100, 2300, 2100],
          }
    );
    const changeYear = (e) => {
        setYear(e.target.value);
    }

    useEffect(() => {
        fetch(`/api/statistics/Orders_per_month/${year}`)
            .then(res => res.json())
            .then(data => {
                console.log('monthssssssssssss:::::::::::::', data);
                setData(data.reduce((acc, { month, orders }) => {
                    acc.xAxis_data.push(String(month));  // Add month as string for x-axis
                    acc.yAxis_data.push(orders);         // Add orders for y-axis
                    return acc;
                  }, { xAxis_data: [], yAxis_data: [] }));
                }
            )
            .catch((err) => console.log('errrrrrrrrrooooooooooooooor'));
    }, [year]);

    return (
        <div className='relative'>
            <select onChange={changeYear} className="z-10 absolute top-4 right-4 h-8 font-black px-4 rounded-xl border border-gray-300">
                {years.map((year, index) => <option key={index} value={year}>{year}</option>)}
            </select>
            <BarChart
                {...{
                    width: 500,
                    height: 300,
                    xAxis: [{ data: data.xAxis_data, scaleType: 'band' }],
                }}
            series={[
                {
                data: data.yAxis_data,
                label: 'Orders',
                },
            ]}
            />
        </div>
    );
}

export default function Statistics() {
    return (
            <div className="select-none flex flex-col items-center gap-10 mx-auto">
                {/* <div className='flex items-center gap-10 flex-wrap'> */}
                    <div className="px-5 py-10 mx-auto">
                        <div className="pt-3">
                            <h2 className="w-full leading-border-text -mb-2 pr-2 pl-2">
                                <span className="bg-white px-2 text-xl font-bold">Monthly Orders</span>
                            </h2>
                            <div className="flex flex-wrap px-5 pb-5 pt-4 border-b border-t border-r border-l border-gray-600 rounded-md">
                                <OrdersStatistics />
                            </div>
                        </div>
                    </div>
                    <div >
                        <h2 className="w-full leading-border-text -mb-2 pr-2 pl-2">
                            <span className="bg-white px-2 text-xl font-bold">Orders Per Year</span>
                        </h2>
                        <div className="px-2 flex border-b border-t border-r border-l border-gray-600 rounded-md">
                            <MonthlyOrdersPerYear />
                        </div>
                    </div>
                {/* </div> */}
                <div >
                    <h2 className="w-full leading-border-text -mb-2 pr-2 pl-2">
                        <span className="bg-white px-2 text-xl font-bold">Top Ordered Articles</span>
                    </h2>
                    <div className="px-2 flex border-b border-t border-r border-l border-gray-600 rounded-md">
                        <ArticlesStatistics />
                    </div>
                </div>
            </div>
    )
}

// {/* <div className="flex gap-4 px-8">
//     <Link to="Orders" className="text-xl text-black flex justify-center items-center h-10 w-24 bg-green-400 rounded-md transition duration-700 ease-in-out hover:bg-transparent border hover:border-slate-800">Orders</Link>
//     <Link to="Articles" className="text-xl text-black flex justify-center items-center h-10 w-24 bg-green-400 rounded-md transition duration-700 ease-in-out hover:bg-transparent border hover:border-slate-800">Articles</Link>
// </div>
// <Routes>
//     <Route path="Orders" element={<OrdersStatistics />} />
//     <Route path="Articles" element={<ArticlesStatistics />} />
// </Routes> */}